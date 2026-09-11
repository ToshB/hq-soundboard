/// <reference lib="webworker" />

import { defaultCache } from "@serwist/turbopack/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, RangeRequestsPlugin, Serwist } from "serwist";
import { AUDIO_BASE } from "@/lib/audio";
import { MUSIC_GROUPS, SOUND_GROUPS } from "@/lib/catalog";
import { MUSIC_CACHE, SFX_CACHE } from "@/lib/offline-cache";

declare global {
	interface WorkerGlobalScope extends SerwistGlobalConfig {
		__SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
	}
}

declare const self: ServiceWorkerGlobalScope;

const AUDIO_ORIGIN = new URL(AUDIO_BASE).origin;

// "/custom/<id>.mp3" is shared by custom sound effects and custom music tracks, and the page puts
// each into a different cache (SFX_CACHE vs MUSIC_CACHE) depending on which it is. Distinguish
// them by id so this worker reads from the same cache the page wrote to.
const CUSTOM_MUSIC_IDS = new Set(
	MUSIC_GROUPS.flatMap((group) => group.tiles)
		.filter((tile) => tile.kind === "custom-music")
		.map((tile) => tile.id),
);
const CUSTOM_SFX_IDS = new Set(
	SOUND_GROUPS.flatMap((group) => group.tiles)
		.filter((tile) => tile.kind === "custom-sfx")
		.map((tile) => tile.id),
);

function customIdFrom(pathname: string): string | undefined {
	return /^\/custom\/(.+)\.mp3$/.exec(pathname)?.[1];
}

// The page (not this worker) writes hq-sfx/hq-music via caches.open(...).put(...), in three
// modes: eager SFX precache on load, an explicit bulk music download, and opportunistic caching
// of whatever track is played. This route only reads from those caches — cacheWillUpdate is a
// no-op so the worker never writes to them and fights the page over the same entries.
const readOnly = { cacheWillUpdate: async () => null };

// Routes are checked in registration order and Serwist's constructor registers `runtimeCaching`
// entries in array order, so these two must come *before* `defaultCache` below — it ends with a
// catch-all `!sameOrigin` route that would otherwise swallow every blob-origin request first.
const serwist = new Serwist({
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: true,
	runtimeCaching: [
		{
			matcher: ({ url }) =>
				url.origin === AUDIO_ORIGIN && (url.pathname.startsWith("/sfx/") || CUSTOM_SFX_IDS.has(customIdFrom(url.pathname) ?? "")),
			handler: new CacheFirst({ cacheName: SFX_CACHE, plugins: [new RangeRequestsPlugin(), readOnly] }),
		},
		{
			matcher: ({ url }) =>
				url.origin === AUDIO_ORIGIN && (url.pathname.startsWith("/music/") || CUSTOM_MUSIC_IDS.has(customIdFrom(url.pathname) ?? "")),
			handler: new CacheFirst({ cacheName: MUSIC_CACHE, plugins: [new RangeRequestsPlugin(), readOnly] }),
		},
		...defaultCache,
	],
});

serwist.addEventListeners();
