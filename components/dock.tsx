"use client";

import { useEffect, useRef, useState } from "react";
import { DEFAULT_VOLUME, usePlayer, VOLUME_KEY } from "@/hooks/use-player";

export type Tab = "sounds" | "music";

export function Dock({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (tab: Tab) => void }) {
	const { audioRef, nowPlaying } = usePlayer();
	const [isPaused, setIsPaused] = useState(true);
	const scrubRef = useRef<HTMLInputElement>(null);
	const [volume, setVolume] = useState(DEFAULT_VOLUME);

	useEffect(() => {
		let saved = Number.parseFloat(localStorage.getItem(VOLUME_KEY) ?? "");
		if (Number.isNaN(saved)) saved = DEFAULT_VOLUME;
		setVolume(saved);
		if (audioRef.current) audioRef.current.volume = saved;
	}, [audioRef]);

	useEffect(() => {
		const el = audioRef.current;
		if (!el) return;

		function onPlay() {
			setIsPaused(false);
		}
		function onPause() {
			setIsPaused(true);
		}
		function onTimeUpdate() {
			const scrub = scrubRef.current;
			if (!scrub || !el || scrub.matches(":active")) return;
			if (el.duration && !Number.isNaN(el.duration)) {
				scrub.value = String((el.currentTime / el.duration) * 1000);
			}
		}

		el.addEventListener("play", onPlay);
		el.addEventListener("pause", onPause);
		el.addEventListener("timeupdate", onTimeUpdate);
		return () => {
			el.removeEventListener("play", onPlay);
			el.removeEventListener("pause", onPause);
			el.removeEventListener("timeupdate", onTimeUpdate);
		};
	}, [audioRef]);

	function togglePlay() {
		const el = audioRef.current;
		if (!el) return;
		if (el.paused) void el.play();
		else el.pause();
	}

	function handleSeek() {
		const el = audioRef.current;
		const scrub = scrubRef.current;
		if (!el || !scrub || !el.duration || Number.isNaN(el.duration)) return;
		el.currentTime = (Number(scrub.value) / 1000) * el.duration;
	}

	function handleVolume(event: React.ChangeEvent<HTMLInputElement>) {
		const value = Number(event.target.value) / 100;
		setVolume(value);
		if (audioRef.current) audioRef.current.volume = value;
		try {
			localStorage.setItem(VOLUME_KEY, String(value));
		} catch {
			// private mode
		}
	}

	return (
		<div className="dock">
			<div className="dock-player">
				<button type="button" className="dock-playbtn" onClick={togglePlay} aria-label={isPaused ? "Play" : "Pause"}>
					{isPaused ? "▶" : "⏸"}
				</button>
				<div className="dock-track">
					<div className="dock-title">{nowPlaying}</div>
					<input
						ref={scrubRef}
						className="dock-scrub"
						type="range"
						min={0}
						max={1000}
						defaultValue={0}
						aria-label="Seek"
						onInput={handleSeek}
					/>
				</div>
				<input
					className="dock-vol"
					type="range"
					min={0}
					max={100}
					value={Math.round(volume * 100)}
					aria-label="Volume"
					onChange={handleVolume}
				/>
			</div>
			<div className="dock-tabs" role="tablist">
				<button
					type="button"
					className={`tab${activeTab === "sounds" ? " tab-active" : ""}`}
					role="tab"
					aria-selected={activeTab === "sounds"}
					onClick={() => onTabChange("sounds")}
				>
					Sounds
				</button>
				<button
					type="button"
					className={`tab${activeTab === "music" ? " tab-active" : ""}`}
					role="tab"
					aria-selected={activeTab === "music"}
					onClick={() => onTabChange("music")}
				>
					Music
				</button>
			</div>
		</div>
	);
}
