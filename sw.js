if (!self.define) {
	let e,
		s = {};
	const n = (n, o) => (
		(n = new URL(n + ".js", o).href),
		s[n] ||
			new Promise((s) => {
				if ("document" in self) {
					const e = document.createElement("script");
					(e.src = n), (e.onload = s), document.head.appendChild(e);
				} else (e = n), importScripts(n), s();
			}).then(() => {
				let e = s[n];
				if (!e) throw new Error(`Module ${n} didn’t register its module`);
				return e;
			})
	);
	self.define = (o, t) => {
		const i = e || ("document" in self ? document.currentScript.src : "") || location.href;
		if (s[i]) return;
		let c = {};
		const l = (e) => n(e, i),
			r = { module: { uri: i }, exports: c, require: l };
		s[i] = Promise.all(o.map((e) => r[e] || l(e))).then((e) => (t(...e), c));
	};
}
define(["./workbox-00b52446"], function (e) {
	"use strict";
	self.addEventListener("message", (e) => {
		e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
	}),
		e.registerRoute(/soundfonts/, new e.CacheFirst({ cacheName: "soundfonts", plugins: [] }), "GET"),
		e.registerRoute(/libs/, new e.CacheFirst({ cacheName: "libs", plugins: [] }), "GET"),
		e.registerRoute(/songs/, new e.StaleWhileRevalidate({ cacheName: "songs", plugins: [] }), "GET"),
		e.registerRoute(/\.(?:html|css|js|json|png|wasm)$/, new e.StaleWhileRevalidate({ cacheName: "assets", plugins: [] }), "GET");
});
//# sourceMappingURL=sw.js.map
