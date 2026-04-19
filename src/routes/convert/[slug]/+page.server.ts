import { getFormatMeta } from "$lib/utils/formatMeta";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, url }) => {
  const meta = getFormatMeta(params.slug);
  const canonicalUrl = url.href;

  return {
    meta,
    canonicalUrl,
  };
};
