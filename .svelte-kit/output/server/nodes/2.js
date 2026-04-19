import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.CHt3LVqr.js","_app/immutable/chunks/CC6W1hjR.js","_app/immutable/chunks/5sD1O7KO.js","_app/immutable/chunks/DWlueePf.js","_app/immutable/chunks/Bc-Uwyl6.js","_app/immutable/chunks/CvBQ9F2C.js","_app/immutable/chunks/D-DsNMwR.js","_app/immutable/chunks/CogyBk8H.js","_app/immutable/chunks/Ct5FWWRu.js"];
export const stylesheets = [];
export const fonts = [];
