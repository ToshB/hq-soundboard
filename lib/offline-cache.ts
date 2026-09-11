import { tileUrls } from "./audio";
import type { Tile } from "./catalog";

export const SFX_CACHE = "hq-sfx";
export const MUSIC_CACHE = "hq-music";
const CONCURRENCY = 4;

export function hasCacheStorage(): boolean {
	return typeof caches !== "undefined";
}

export type CacheProgress = (done: number, total: number) => void;

/** Fetches and caches a list of URLs with bounded concurrency. Skips URLs already cached. */
export async function cacheUrls(urls: string[], cacheName: string, onProgress?: CacheProgress): Promise<void> {
	if (!hasCacheStorage()) return;
	const cache = await caches.open(cacheName);
	const queue = [...urls];
	const total = urls.length;
	let done = 0;
	onProgress?.(done, total);

	async function worker() {
		let url = queue.shift();
		while (url) {
			const hit = await cache.match(url);
			if (!hit) {
				try {
					const response = await fetch(url);
					if (response.ok) await cache.put(url, response);
				} catch {
					// offline or missing file - skip, keep going
				}
			}
			done++;
			onProgress?.(done, total);
			url = queue.shift();
		}
	}

	await Promise.all(Array.from({ length: Math.min(CONCURRENCY, total) }, worker));
}

/** Opportunistically caches a track the moment it's played, independent of the <audio> element. */
export async function cachePlayedTrack(src: string): Promise<void> {
	if (!hasCacheStorage() || !src) return;
	const cache = await caches.open(MUSIC_CACHE);
	const hit = await cache.match(src);
	if (hit) return;
	try {
		const response = await fetch(src);
		if (response.ok) await cache.put(src, response);
	} catch {
		// offline or missing file - ignore
	}
}

export async function cachedUrlSet(cacheName: string): Promise<Set<string>> {
	if (!hasCacheStorage()) return new Set();
	const cache = await caches.open(cacheName);
	const keys = await cache.keys();
	return new Set(keys.map((request) => request.url));
}

/** Tile ids whose every URL is present in `cachedUrls`. */
export function computeCachedTileIds(tiles: Tile[], cachedUrls: Set<string>): Set<string> {
	const result = new Set<string>();
	for (const tile of tiles) {
		const urls = tileUrls(tile);
		if (urls.length > 0 && urls.every((url) => cachedUrls.has(url))) {
			result.add(tile.id);
		}
	}
	return result;
}
