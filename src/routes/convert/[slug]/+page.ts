import { getConverter } from "$lib/utils/converterRouter";
import { getFormatMeta } from "$lib/utils/formatMeta";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const converter = getConverter(params.slug);
  if (!converter) {
    throw error(404, "Conversion type not found");
  }

  const meta = getFormatMeta(params.slug);

  return {
    slug: params.slug,
    fromFormat: converter.fromFormat,
    toFormat: converter.toFormat,
    libraryName: converter.libraryName,
    meta,
  };
};
