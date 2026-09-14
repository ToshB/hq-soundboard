"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useOfflineCache } from "@/hooks/use-offline-cache";
import { usePinned } from "@/hooks/use-pinned";
import { PlayerProvider } from "@/hooks/use-player";
import { computeCachedTileIds } from "@/lib/offline-cache";
import { MUSIC_GROUPS, SOUND_COLUMNS, TILES_BY_ID } from "@/lib/catalog";
import { Dock, type Tab } from "./dock";
import { OfflinePanel } from "./offline-panel";
import { QuestsPanel } from "./quests-panel";
import { TileGrid } from "./tile-grid";

const VERSION = "3.0";

export function SoundBoard() {
	const [activeTab, setActiveTab] = useState<Tab>("sounds");
	const { pinnedIds, togglePin } = usePinned();
	const offlineCache = useOfflineCache();

	useEffect(() => {
		navigator.storage?.persist?.();
	}, []);

	const musicTiles = useMemo(() => MUSIC_GROUPS.flatMap((group) => group.tiles), []);
	const cachedMusicTileIds = useMemo(
		() => computeCachedTileIds(musicTiles, offlineCache.musicCachedUrls),
		[musicTiles, offlineCache.musicCachedUrls],
	);

	const pinnedSoundTiles = pinnedIds.map((id) => TILES_BY_ID.get(id)).filter((tile) => tile && !isMusicTile(tile.id));
	const pinnedMusicTiles = pinnedIds.map((id) => TILES_BY_ID.get(id)).filter((tile) => tile && isMusicTile(tile.id));

	function isMusicTile(id: string): boolean {
		return musicTiles.some((tile) => tile.id === id);
	}

	return (
		<PlayerProvider onTrackCached={offlineCache.refresh}>
			<div className="panel">
				<header className="pt-3 pb-1">
					<Image
						className="mx-auto h-16 sm:h-20 w-auto"
						src="/images/gui/logo.png"
						alt="HeroQuest"
						width={863}
						height={285}
						priority
					/>
				</header>

				<div hidden={activeTab !== "sounds"} role="tabpanel">
					<PinnedGroup
						tiles={pinnedSoundTiles}
						pinnedIds={pinnedIds}
						cachedTileIds={cachedMusicTileIds}
						onTogglePin={togglePin}
						emptyLabel="Hold a sound to pin it here."
					/>

					<div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-x-3 items-start">
						{SOUND_COLUMNS.map((column, columnIndex) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: columns are a fixed layout, not a dynamic list
							<div className="min-w-0" key={columnIndex}>
								{column.map((group) => (
									<div key={group.label}>
										<div className="group-label">{group.label}</div>
										<TileGrid
											tiles={group.tiles.filter((tile) => !pinnedIds.includes(tile.id))}
											minTileWidth={group.minTileWidth}
											pinnedIds={pinnedIds}
											cachedTileIds={cachedMusicTileIds}
											onTogglePin={togglePin}
										/>
									</div>
								))}
							</div>
						))}
					</div>
				</div>

				<div hidden={activeTab !== "music"} role="tabpanel">
					<OfflinePanel
						downloadState={offlineCache.downloadState}
						progress={offlineCache.progress}
						musicCachedCount={offlineCache.musicCachedUrls.size}
						musicTotal={offlineCache.musicTotal}
						sfxCachedCount={offlineCache.sfxCachedCount}
						sfxTotal={offlineCache.sfxTotal}
						onDownload={offlineCache.downloadMusic}
					/>

					<PinnedGroup
						tiles={pinnedMusicTiles}
						pinnedIds={pinnedIds}
						cachedTileIds={cachedMusicTileIds}
						onTogglePin={togglePin}
						emptyLabel="Hold a track to pin it here."
					/>

					{MUSIC_GROUPS.map((group) => (
						<div key={group.label}>
							<div className="group-label">{group.label}</div>
							<TileGrid
								tiles={group.tiles.filter((tile) => !pinnedIds.includes(tile.id))}
								minTileWidth={group.minTileWidth}
								pinnedIds={pinnedIds}
								cachedTileIds={cachedMusicTileIds}
								onTogglePin={togglePin}
							/>
						</div>
					))}
				</div>

				<div hidden={activeTab !== "quests"} role="tabpanel">
					<QuestsPanel />
				</div>

				<footer className="footer-glow text-[11px] text-center pt-4 pb-2 leading-relaxed">
					<p>
						Created by{" "}
						<a className="underline" href="https://banjogames.wordpress.com/">
							Banjo
						</a>{" "}
						(v{VERSION} mp3)
					</p>
					<p>
						Official sounds, music and art &copy; Hasbro. Additional sounds from{" "}
						<a className="underline" href="https://freesound.org/">
							Freesound.org
						</a>
						, additional music from{" "}
						<a className="underline" href="https://incompetech.com/">
							Incompetech.com
						</a>
						.
					</p>
					<p>
						Chiptunes by Barry Leitch (DOS/Amiga), Patrick Phelan (Sorasil) and Neil Baldwin (NES). Covers by Grazia Pizzuto
						and Aki J&auml;rvinen.
					</p>
				</footer>
			</div>

			<Dock activeTab={activeTab} onTabChange={setActiveTab} />
		</PlayerProvider>
	);
}

function PinnedGroup({
	tiles,
	pinnedIds,
	cachedTileIds,
	onTogglePin,
	emptyLabel,
}: {
	tiles: (ReturnType<typeof TILES_BY_ID.get> | undefined)[];
	pinnedIds: string[];
	cachedTileIds: Set<string>;
	onTogglePin: (id: string) => void;
	emptyLabel: string;
}) {
	const resolved = tiles.filter((tile): tile is NonNullable<typeof tile> => Boolean(tile));
	if (resolved.length === 0) {
		return <p className="text-xs text-center italic opacity-60 py-3">{emptyLabel}</p>;
	}
	return (
		<div>
			<div className="group-label">&#9733; Pinned</div>
			<TileGrid tiles={resolved} minTileWidth={76} pinnedIds={pinnedIds} cachedTileIds={cachedTileIds} onTogglePin={onTogglePin} />
		</div>
	);
}
