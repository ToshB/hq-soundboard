"use client";

import { useRef } from "react";
import type { Tile as TileData } from "@/lib/catalog";
import { TileButton } from "./tile";

const LONG_PRESS_MS = 500;
const MOVE_CANCEL_PX = 10;

export function TileGrid({
	tiles,
	minTileWidth,
	pinnedIds,
	cachedTileIds,
	onTogglePin,
}: {
	tiles: TileData[];
	minTileWidth: number;
	pinnedIds: string[];
	cachedTileIds: Set<string>;
	onTogglePin: (id: string) => void;
}) {
	const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const pressStart = useRef<{ x: number; y: number } | null>(null);
	const suppressClick = useRef(false);

	function tileIdFromEvent(e: { target: EventTarget | null }): string | undefined {
		const target = e.target as HTMLElement;
		return target.closest<HTMLButtonElement>("button[data-tile-id]")?.dataset.tileId;
	}

	function clearPressTimer() {
		if (pressTimer.current !== null) {
			clearTimeout(pressTimer.current);
			pressTimer.current = null;
		}
	}

	function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
		const id = tileIdFromEvent(e);
		if (!id) return;
		pressStart.current = { x: e.clientX, y: e.clientY };
		pressTimer.current = setTimeout(() => {
			suppressClick.current = true;
			pressTimer.current = null;
			navigator.vibrate?.(15);
			onTogglePin(id);
		}, LONG_PRESS_MS);
	}

	function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
		if (pressTimer.current === null || !pressStart.current) return;
		const dx = e.clientX - pressStart.current.x;
		const dy = e.clientY - pressStart.current.y;
		if (Math.sqrt(dx * dx + dy * dy) > MOVE_CANCEL_PX) clearPressTimer();
	}

	function handleClickCapture(e: React.MouseEvent<HTMLDivElement>) {
		if (suppressClick.current) {
			e.stopPropagation();
			e.preventDefault();
			suppressClick.current = false;
		}
	}

	function handleContextMenu(e: React.MouseEvent<HTMLDivElement>) {
		const id = tileIdFromEvent(e);
		if (id) {
			e.preventDefault();
			onTogglePin(id);
		}
	}

	return (
		<div
			className="grid gap-2 justify-center py-1"
			style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minTileWidth}px, 1fr))` }}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={clearPressTimer}
			onPointerCancel={clearPressTimer}
			onPointerLeave={clearPressTimer}
			onClickCapture={handleClickCapture}
			onContextMenu={handleContextMenu}
		>
			{tiles.map((tile) => (
				<TileButton key={tile.id} tile={tile} pinned={pinnedIds.includes(tile.id)} cached={cachedTileIds.has(tile.id)} />
			))}
		</div>
	);
}
