"use client";

import { useCallback, useEffect, useState } from "react";
import { tileUrls } from "@/lib/audio";
import { MUSIC_GROUPS, SOUND_GROUPS } from "@/lib/catalog";
import { cacheUrls, cachedUrlSet, hasCacheStorage, MUSIC_CACHE, SFX_CACHE } from "@/lib/offline-cache";

const SFX_URLS = Array.from(new Set(SOUND_GROUPS.flatMap((group) => group.tiles).flatMap(tileUrls)));
const MUSIC_URLS = Array.from(new Set(MUSIC_GROUPS.flatMap((group) => group.tiles).flatMap(tileUrls)));

export type MusicDownloadState = "idle" | "downloading" | "done";

export function useOfflineCache() {
	const [sfxCachedCount, setSfxCachedCount] = useState(0);
	const [musicCachedUrls, setMusicCachedUrls] = useState<Set<string>>(new Set());
	const [downloadState, setDownloadState] = useState<MusicDownloadState>("idle");
	const [progress, setProgress] = useState({ done: 0, total: 0 });

	const refresh = useCallback(async () => {
		if (!hasCacheStorage()) return;
		const [sfxUrls, musicUrls] = await Promise.all([cachedUrlSet(SFX_CACHE), cachedUrlSet(MUSIC_CACHE)]);
		setSfxCachedCount(sfxUrls.size);
		setMusicCachedUrls(musicUrls);
	}, []);

	useEffect(() => {
		if (!hasCacheStorage()) return;
		cacheUrls(SFX_URLS, SFX_CACHE).then(refresh);
	}, [refresh]);

	const downloadMusic = useCallback(async () => {
		setDownloadState("downloading");
		await cacheUrls(MUSIC_URLS, MUSIC_CACHE, (done, total) => setProgress({ done, total }));
		setDownloadState("done");
		await refresh();
	}, [refresh]);

	return {
		sfxCachedCount,
		sfxTotal: SFX_URLS.length,
		musicCachedUrls,
		musicTotal: MUSIC_URLS.length,
		downloadState,
		progress,
		downloadMusic,
		refresh,
	};
}
