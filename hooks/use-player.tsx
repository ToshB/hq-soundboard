"use client";

import { createContext, type ReactNode, type RefObject, useCallback, useContext, useEffect, useRef, useState } from "react";
import { cachePlayedTrack } from "@/lib/offline-cache";

export const VOLUME_KEY = "hq_volume";
export const DEFAULT_VOLUME = 0.2;

type PlayerContextValue = {
	audioRef: RefObject<HTMLAudioElement | null>;
	nowPlaying: string;
	activeTrackId: string | null;
	isPaused: boolean;
	playSfx: (url: string, tileId: string) => void;
	playTrack: (url: string, label: string, tileId: string) => void;
	isSfxPlaying: (tileId: string) => boolean;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children, onTrackCached }: { children: ReactNode; onTrackCached?: () => void }) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [nowPlaying, setNowPlaying] = useState("Nothing playing");
	const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
	const [isPaused, setIsPaused] = useState(true);
	const [sfxCounts, setSfxCounts] = useState<Record<string, number>>({});

	useEffect(() => {
		const el = audioRef.current;
		if (!el) return;

		function onPlay() {
			setIsPaused(false);
		}
		function onPause() {
			setIsPaused(true);
		}
		function onEnded() {
			setActiveTrackId(null);
		}
		function onError() {
			setActiveTrackId(null);
		}

		el.addEventListener("play", onPlay);
		el.addEventListener("pause", onPause);
		el.addEventListener("ended", onEnded);
		el.addEventListener("error", onError);
		return () => {
			el.removeEventListener("play", onPlay);
			el.removeEventListener("pause", onPause);
			el.removeEventListener("ended", onEnded);
			el.removeEventListener("error", onError);
		};
	}, []);

	const playSfx = useCallback((url: string, tileId: string) => {
		setSfxCounts((counts) => ({ ...counts, [tileId]: (counts[tileId] ?? 0) + 1 }));

		function release() {
			setSfxCounts((counts) => {
				const next = (counts[tileId] ?? 1) - 1;
				if (next <= 0) {
					const { [tileId]: _removed, ...rest } = counts;
					return rest;
				}
				return { ...counts, [tileId]: next };
			});
		}

		const audio = new Audio(url);
		audio.addEventListener("ended", release, { once: true });
		audio.addEventListener("error", release, { once: true });
		void audio.play();
	}, []);

	const playTrack = useCallback(
		(url: string, label: string, tileId: string) => {
			const el = audioRef.current;
			if (!el) return;
			el.pause();
			el.src = url;
			void el.play();
			setNowPlaying(label);
			setActiveTrackId(tileId);
			void cachePlayedTrack(url).then(() => onTrackCached?.());
		},
		[onTrackCached],
	);

	const isSfxPlaying = useCallback((tileId: string) => (sfxCounts[tileId] ?? 0) > 0, [sfxCounts]);

	return (
		<PlayerContext.Provider
			value={{ audioRef, nowPlaying, activeTrackId, isPaused, playSfx, playTrack, isSfxPlaying }}
		>
			{children}
			<audio ref={audioRef} preload="none" loop className="hidden" />
		</PlayerContext.Provider>
	);
}

export function usePlayer(): PlayerContextValue {
	const ctx = useContext(PlayerContext);
	if (!ctx) throw new Error("usePlayer must be used within a PlayerProvider");
	return ctx;
}
