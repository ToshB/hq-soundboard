// HeroQuest Sound Board - service worker
//
// The page itself does the heavy lifting for audio: it fetches sfx/music
// files with plain `fetch()` and writes them into the "hq-sfx" / "hq-music"
// caches (see index.html). This worker only precaches the app shell and
// serves everything from cache, including slicing 206 Partial Content
// responses for <audio> range requests (required for seeking, especially
// on iOS Safari - a cached 200 response to a ranged request breaks it).

var SHELL = "hq-shell-v3"; // bump this to ship shell changes; never rename hq-sfx/hq-music
var AUDIO_ORIGIN = "https://t5ysgwkiiembz7oj.public.blob.vercel-storage.com"; // must match index.html AUDIO_BASE
var SHELL_FILES = [
	"./",
	"index.html",
	"manifest.webmanifest",
	"dist/app.css",
	"fonts/cinzel-600.woff2",
	"images/gui/logo.png",
	"images/gui/background2.png",
	"images/gui/icon-192.png",
	"images/gui/icon-512.png"
];

self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(SHELL).then(function(cache) {
			return cache.addAll(SHELL_FILES);
		}).then(function() {
			return self.skipWaiting();
		})
	);
});

// Bump this when hq-sfx/hq-music need a one-time purge (e.g. their URL scheme
// changed), so old, now-unmatchable entries don't sit around forever. Checked
// against a marker cache so it runs once per bump, not on every activation.
var AUDIO_PURGE_VERSION = "blob-migration-1";

self.addEventListener("activate", function(event) {
	event.waitUntil(
		caches.has(AUDIO_PURGE_VERSION).then(function(already_purged) {
			return Promise.all([
				caches.keys().then(function(names) {
					return Promise.all(names.map(function(name) {
						if (name.indexOf("hq-shell-") === 0 && name !== SHELL) {
							return caches.delete(name);
						}
						if (!already_purged && (name === "hq-sfx" || name === "hq-music")) {
							return caches.delete(name);
						}
					}));
				}),
				already_purged ? Promise.resolve() : caches.open(AUDIO_PURGE_VERSION)
			]);
		}).then(function() {
			return self.clients.claim();
		})
	);
});

function serve_range(request, cached) {
	return cached.arrayBuffer().then(function(buf) {
		var m = /bytes=(\d*)-(\d*)/.exec(request.headers.get("range") || "");
		var start = m && m[1] ? parseInt(m[1], 10) : 0;
		var end = m && m[2] ? parseInt(m[2], 10) : buf.byteLength - 1;
		if (end >= buf.byteLength) end = buf.byteLength - 1;
		return new Response(buf.slice(start, end + 1), {
			status: 206,
			statusText: "Partial Content",
			headers: {
				"Content-Type": cached.headers.get("Content-Type") || "audio/mpeg",
				"Content-Length": String(end - start + 1),
				"Content-Range": "bytes " + start + "-" + end + "/" + buf.byteLength,
				"Accept-Ranges": "bytes"
			}
		});
	});
}

self.addEventListener("fetch", function(event) {
	var request = event.request;
	if (request.method !== "GET") return;

	var url = new URL(request.url);
	var same_origin = url.origin === self.location.origin;
	if (!same_origin && url.origin !== AUDIO_ORIGIN) return;

	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request).catch(function() {
				return caches.match("index.html");
			})
		);
		return;
	}

	// Same-origin entries are keyed by pathname+search (so query strings and
	// scheme don't matter); cross-origin audio is keyed by the full request URL
	// since it isn't ours to normalize.
	var key = same_origin ? url.pathname + url.search : request.url;

	event.respondWith(
		caches.match(key).then(function(cached) {
			if (cached) {
				if (request.headers.has("range")) {
					return serve_range(request, cached);
				}
				return cached;
			}
			return fetch(request);
		})
	);
});
