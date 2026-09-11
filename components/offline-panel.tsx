"use client";

import type { MusicDownloadState } from "@/hooks/use-offline-cache";

// Not derived from the actual file sizes — kept as the same descriptive estimate the original used.
const MUSIC_SIZE_LABEL = "382 MB";

export function OfflinePanel({
	downloadState,
	progress,
	musicCachedCount,
	musicTotal,
	sfxCachedCount,
	sfxTotal,
	onDownload,
}: {
	downloadState: MusicDownloadState;
	progress: { done: number; total: number };
	musicCachedCount: number;
	musicTotal: number;
	sfxCachedCount: number;
	sfxTotal: number;
	onDownload: () => void;
}) {
	const pct = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;
	const downloading = downloadState === "downloading";

	return (
		<div className="max-w-[420px] mx-auto pb-2 pt-3">
			<button type="button" className="download-btn" disabled={downloading} onClick={onDownload}>
				{downloadState === "done" ? "Music cached for offline" : `Download all music for offline (${MUSIC_SIZE_LABEL})`}
			</button>
			{downloading && (
				<div className="cachebar">
					<div className="cachebar-fill" style={{ width: `${pct}%` }} />
				</div>
			)}
			{!downloading && (
				<p className="text-xs text-center opacity-70 pt-1">
					SFX {sfxCachedCount}/{sfxTotal} cached &middot; music {musicCachedCount}/{musicTotal} cached
				</p>
			)}
		</div>
	);
}
