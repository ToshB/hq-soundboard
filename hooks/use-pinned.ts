"use client";

import { useCallback, useEffect, useState } from "react";

const PIN_KEY = "hq_pinned";

function loadPinned(): string[] {
	try {
		const raw = localStorage.getItem(PIN_KEY);
		return raw ? (JSON.parse(raw) as string[]) : [];
	} catch {
		return [];
	}
}

function savePinned(ids: string[]) {
	try {
		localStorage.setItem(PIN_KEY, JSON.stringify(ids));
	} catch {
		// private mode
	}
}

export function usePinned() {
	const [pinnedIds, setPinnedIds] = useState<string[]>([]);

	useEffect(() => {
		setPinnedIds(loadPinned());
	}, []);

	const togglePin = useCallback((id: string) => {
		setPinnedIds((prev) => {
			const next = prev.includes(id) ? prev.filter((pinned) => pinned !== id) : [...prev, id];
			savePinned(next);
			return next;
		});
	}, []);

	return { pinnedIds, togglePin };
}
