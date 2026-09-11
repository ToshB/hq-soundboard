import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "HeroQuest Sound Board",
		short_name: "HeroQuest",
		start_url: "/",
		scope: "/",
		display: "standalone",
		orientation: "any",
		background_color: "#000000",
		theme_color: "#000000",
		icons: [
			{ src: "/images/gui/icon-192.png", sizes: "192x192", type: "image/png" },
			{ src: "/images/gui/icon-512.png", sizes: "512x512", type: "image/png" },
			{ src: "/images/gui/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
		],
	};
}
