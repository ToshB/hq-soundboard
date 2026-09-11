import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SerwistProvider } from "@serwist/turbopack/react";
import "./globals.css";

const cinzel = localFont({
	src: "../fonts/cinzel-600.woff2",
	weight: "600",
	style: "normal",
	display: "swap",
	variable: "--font-cinzel",
});

export const metadata: Metadata = {
	title: "HeroQuest Sound Board",
	appleWebApp: {
		title: "HeroQuest Sound Board",
	},
	icons: {
		icon: "/images/gui/icon-192.png",
		apple: "/images/gui/icon-192.png",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
	themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={cinzel.variable}>
			<body>
				<SerwistProvider swUrl="/serwist/sw.js" disable={process.env.NODE_ENV === "development"}>
					{children}
				</SerwistProvider>
			</body>
		</html>
	);
}
