import { g as getFormatMeta } from "../../../../chunks/formatMeta.js";
const load = async ({ params, url }) => {
  const meta = getFormatMeta(params.slug);
  const canonicalUrl = url.href;
  return {
    meta,
    canonicalUrl
  };
};
export {
  load
};
