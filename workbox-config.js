module.exports = {
	globDirectory: ".",
	globPatterns: [],
	globIgnores: ["typings/**", "screenshots/**"],
	swDest: "sw.js",
	ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
	runtimeCaching: [
		{
			urlPattern: /soundfonts/,
			handler: "CacheFirst",
			options: {
				cacheName: "soundfonts",
			},
		},
		{
			urlPattern: /libs/,
			handler: "CacheFirst",
			options: {
				cacheName: "libs",
			},
		},
		{
			urlPattern: /songs/,
			handler: "StaleWhileRevalidate",
			options: {
				cacheName: "songs",
			},
		},
		{
			urlPattern: /\.(?:html|css|js|json|png|wasm)$/,
			handler: "StaleWhileRevalidate",
			options: {
				cacheName: "assets",
			},
		},
	],
};
