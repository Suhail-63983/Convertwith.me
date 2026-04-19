import { a as getConverter } from "../../../../chunks/converterRouter.js";
import { g as getFormatMeta } from "../../../../chunks/formatMeta.js";
import { error } from "@sveltejs/kit";
const load = async ({ params }) => {
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
    meta
  };
};
export {
  load
};
