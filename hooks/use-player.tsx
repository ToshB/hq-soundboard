"use client";

import { createContext, type ReactNode, type RefObject, useCallback, useContext, useRef, useState } from "react";
import { cachePlayedTrack } from "@/lib/offline-cache";

export const VOLUME_KEY = "hq_volume";
export const DEFAULT_VOLUME = 0.2;

type PlayerContextValue = {
	audioRef: RefObject<HTMLAudioElement | null>;
	nowPlaying: string;
	playSfx: (url: string) => void;
	playTrack: (url: string, label: string) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children, onTrackCached }: { children: ReactNode; onTrackCached?: () => void }) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [nowPlaying, setNowPlaying] = useState("Nothing playing");

	const playSfx = useCallback((url: string) => {
		const audio = new Audio(url);
		void audio.play();
	}, []);

	const playTrack = useCallback(
		(url: string, label: string) => {
			const el = audioRef.current;
			if (!el) return;
			el.pause();
			el.src = url;
			void el.play();
			setNowPlaying(label);
			void cachePlayedTrack(url).then(() => onTrackCached?.());
		},
		[onTrackCached],
	);

	return (
		<PlayerContext.Provider value={{ audioRef, nowPlaying, playSfx, playTrack }}>
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
