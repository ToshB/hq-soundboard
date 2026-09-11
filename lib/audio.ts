import type { Tile } from "./catalog";

const FORMAT = "mp3";

export const AUDIO_BASE = "https://t5ysgwkiiembz7oj.public.blob.vercel-storage.com";

export function sfxUrl(id: string): string {
	return `${AUDIO_BASE}/sfx/${FORMAT}/${id}.${FORMAT}`;
}

export function musicUrl(id: string): string {
	return `${AUDIO_BASE}/music/${FORMAT}/${id}.${FORMAT}`;
}

export function customUrl(id: string): string {
	return `${AUDIO_BASE}/custom/${id}.mp3`;
}

/** All URLs a tile can play. `music-secret` tiles have a shift-click alternate. */
export function tileUrls(tile: Tile): string[] {
	switch (tile.kind) {
		case "sfx":
			return [sfxUrl(tile.id)];
		case "custom-sfx":
			return [customUrl(tile.id)];
		case "music":
			return [musicUrl(tile.id)];
		case "custom-music":
			return [customUrl(tile.id)];
		case "music-secret":
			return [musicUrl(tile.id), musicUrl(`${tile.id}_hidden`)];
	}
}

export function playUrlFor(tile: Tile, shiftKey: boolean): string {
	if (tile.kind === "custom-sfx" || tile.kind === "custom-music") return customUrl(tile.id);
	if (tile.kind === "music-secret") return musicUrl(shiftKey ? `${tile.id}_hidden` : tile.id);
	if (tile.kind === "music") return musicUrl(tile.id);
	return sfxUrl(tile.id);
}
