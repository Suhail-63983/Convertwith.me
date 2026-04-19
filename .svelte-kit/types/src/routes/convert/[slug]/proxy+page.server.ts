// @ts-nocheck
import { getFormatMeta } from "$lib/utils/formatMeta";
import type { PageServerLoad } from "./$types";

export const load = async ({ params, url }: Parameters<PageServerLoad>[0]) => {
  const meta = getFormatMeta(params.slug);
  const canonicalUrl = url.href;

  return {
    meta,
    canonicalUrl,
  };
};
