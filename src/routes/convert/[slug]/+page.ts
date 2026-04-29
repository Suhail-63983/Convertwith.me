import { getConverter } from "$lib/utils/converterRouter";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, data }) => {
  const converter = getConverter(params.slug);
  if (!converter) {
    throw error(404, "Conversion type not found");
  }

  return {
    ...data,
    slug: params.slug,
    fromFormat: converter.fromFormat,
    toFormat: converter.toFormat,
    libraryName: converter.libraryName,
  };
};
