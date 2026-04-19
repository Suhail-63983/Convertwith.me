/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface Locals {}
  interface PageData {
    slug?: string;
    fromFormat?: string;
    toFormat?: string;
    libraryName?: string;
    meta?: {
      title: string;
      description: string;
      h1: string;
      faq: Array<{ question: string; answer: string }>;
    };
    canonicalUrl?: string;
  }
  interface PageState {}
  interface Platform {}
}
