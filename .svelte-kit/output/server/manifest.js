export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","robots.txt","service-worker.js"]),
	mimeTypes: {".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.jaBJc38E.js",app:"_app/immutable/entry/app.KX5cPqyJ.js",imports:["_app/immutable/entry/start.jaBJc38E.js","_app/immutable/chunks/CQi6WCDq.js","_app/immutable/chunks/5sD1O7KO.js","_app/immutable/chunks/B6Jm3KUB.js","_app/immutable/entry/app.KX5cPqyJ.js","_app/immutable/chunks/Ct5FWWRu.js","_app/immutable/chunks/5sD1O7KO.js","_app/immutable/chunks/D-DsNMwR.js","_app/immutable/chunks/CC6W1hjR.js","_app/immutable/chunks/B6Jm3KUB.js","_app/immutable/chunks/t-xz3RnW.js","_app/immutable/chunks/BFjm1JoK.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap.xml/_server.ts.js'))
			}
		],
		prerendered_routes: new Set(["/","/about","/privacy","/convert/jpg-to-png","/convert/jpg-to-png/__data.json","/convert/jpg-to-webp","/convert/jpg-to-webp/__data.json","/convert/jpg-to-gif","/convert/jpg-to-gif/__data.json","/convert/png-to-jpg","/convert/png-to-jpg/__data.json","/convert/png-to-webp","/convert/png-to-webp/__data.json","/convert/webp-to-jpg","/convert/webp-to-jpg/__data.json","/convert/webp-to-png","/convert/webp-to-png/__data.json","/convert/gif-to-png","/convert/gif-to-png/__data.json","/convert/gif-to-jpg","/convert/gif-to-jpg/__data.json","/convert/heic-to-jpg","/convert/heic-to-jpg/__data.json","/convert/heic-to-png","/convert/heic-to-png/__data.json","/convert/pdf-to-docx","/convert/pdf-to-docx/__data.json","/convert/docx-to-pdf","/convert/docx-to-pdf/__data.json","/convert/docx-to-html","/convert/docx-to-html/__data.json","/convert/pdf-to-jpg","/convert/pdf-to-jpg/__data.json","/convert/pdf-to-png","/convert/pdf-to-png/__data.json","/convert/jpg-to-pdf","/convert/jpg-to-pdf/__data.json","/convert/png-to-pdf","/convert/png-to-pdf/__data.json"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
