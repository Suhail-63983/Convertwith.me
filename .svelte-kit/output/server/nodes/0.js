import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.C55sf-Ku.js","_app/immutable/chunks/CC6W1hjR.js","_app/immutable/chunks/5sD1O7KO.js","_app/immutable/chunks/t-xz3RnW.js","_app/immutable/chunks/B6Jm3KUB.js","_app/immutable/chunks/Bc-Uwyl6.js","_app/immutable/chunks/CogyBk8H.js","_app/immutable/chunks/D-DsNMwR.js","_app/immutable/chunks/DWlueePf.js","_app/immutable/chunks/BkSzexC6.js","_app/immutable/chunks/CQi6WCDq.js"];
export const stylesheets = ["_app/immutable/assets/0.Cj1mqmHz.css"];
export const fonts = [];
