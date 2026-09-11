"use client";

import { playUrlFor } from "@/lib/audio";
import type { Tile as TileData } from "@/lib/catalog";
import { usePlayer } from "@/hooks/use-player";

function isMusicKind(kind: TileData["kind"]): boolean {
	return kind === "music" || kind === "custom-music" || kind === "music-secret";
}

export function TileButton({ tile, pinned, cached }: { tile: TileData; pinned: boolean; cached: boolean }) {
	const { playSfx, playTrack, isSfxPlaying, activeTrackId, isPaused } = usePlayer();
	const isMusic = isMusicKind(tile.kind);
	const held = !isMusic && isSfxPlaying(tile.id);
	const playing = isMusic && activeTrackId === tile.id && !isPaused;

	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		const url = playUrlFor(tile, event.shiftKey);
		if (isMusic) {
			playTrack(url, tile.label, tile.id);
		} else {
			playSfx(url, tile.id);
		}
	}

	const classNames = [
		"btn",
		isMusic && "btn-music",
		isMusic && cached && "btn-cached",
		pinned && "btn-pinned",
		held && "btn-held",
		playing && "btn-playing",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			type="button"
			data-tile-id={tile.id}
			className={classNames}
			onClick={handleClick}
			aria-pressed={held || playing}
		>
			{playing && (
				<span className="btn-bars" aria-hidden="true">
					<i />
					<i />
					<i />
				</span>
			)}
			{tile.label}
		</button>
	);
}
