// HeroQuest Sound Board - service worker
//
// The page itself does the heavy lifting for audio: it fetches sfx/music
// files with plain `fetch()` and writes them into the "hq-sfx" / "hq-music"
// caches (see index.html). This worker only precaches the app shell and
// serves everything from cache, including slicing 206 Partial Content
// responses for <audio> range requests (required for seeking, especially
// on iOS Safari - a cached 200 response to a ranged request breaks it).

var SHELL = "hq-shell-v1"; // bump this to ship shell changes; never rename hq-sfx/hq-music
var SHELL_FILES = [
	"./",
	"index.html",
	"manifest.webmanifest",
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

self.addEventListener("activate", function(event) {
	event.waitUntil(
		caches.keys().then(function(names) {
			return Promise.all(names.map(function(name) {
				if (name.indexOf("hq-shell-") === 0 && name !== SHELL) {
					return caches.delete(name);
				}
			}));
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
	if (url.origin !== self.location.origin) return;

	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request).catch(function() {
				return caches.match("index.html");
			})
		);
		return;
	}

	event.respondWith(
		caches.match(url.pathname + url.search).then(function(cached) {
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
