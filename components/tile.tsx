"use client";

import { useState } from "react";
import { playUrlFor } from "@/lib/audio";
import type { Tile as TileData } from "@/lib/catalog";
import { usePlayer } from "@/hooks/use-player";

const FLASH_MS = 500;

function isMusicKind(kind: TileData["kind"]): boolean {
	return kind === "music" || kind === "custom-music" || kind === "music-secret";
}

export function TileButton({ tile, pinned, cached }: { tile: TileData; pinned: boolean; cached: boolean }) {
	const { playSfx, playTrack } = usePlayer();
	const [lit, setLit] = useState(false);
	const isMusic = isMusicKind(tile.kind);

	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		setLit(true);
		setTimeout(() => setLit(false), FLASH_MS);

		const url = playUrlFor(tile, event.shiftKey);
		if (isMusic) {
			playTrack(url, tile.label);
		} else {
			playSfx(url);
		}
	}

	const classNames = ["btn", isMusic && "btn-music", lit && "btn-lit", pinned && "btn-pinned", isMusic && cached && "btn-cached"]
		.filter(Boolean)
		.join(" ");

	return (
		<button type="button" data-tile-id={tile.id} className={classNames} onClick={handleClick}>
			{tile.label}
		</button>
	);
}
