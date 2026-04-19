export interface FormatMeta {
  title: string;
  description: string;
  h1: string;
  faq: Array<{ question: string; answer: string }>;
}

const meta: Record<string, FormatMeta> = {
  "jpg-to-png": {
    title: "Convert JPG to PNG Online — Free & Private",
    description:
      "Convert JPG to PNG instantly in your browser. No uploads, no tracking, 100% free. Perfect for transparent backgrounds and lossless quality.",
    h1: "Convert JPG to PNG — Free, Private, Instant",
    faq: [
      {
        question: "Is this JPG to PNG converter free?",
        answer:
          "Yes, completely free with no limits on the number of conversions. All processing happens in your browser using WebAssembly.",
      },
      {
        question: "Is my data private when converting JPG to PNG?",
        answer:
          "Absolutely. Your files never leave your device. The conversion runs entirely in your browser using client-side technology. We have zero access to your files.",
      },
      {
        question: "What quality will my PNG output be?",
        answer:
          "PNG is a lossless format, so the output will preserve the quality of your JPG without any additional compression artifacts. However, JPG compression artifacts from the original file will remain.",
      },
      {
        question: "What is the maximum file size for JPG to PNG conversion?",
        answer:
          "There is no server-side limit since processing happens locally. Files up to 500MB work well on modern devices with sufficient RAM.",
      },
      {
        question: "Does this work on mobile browsers?",
        answer:
          "Yes, this converter works on Chrome, Edge, Firefox, and Safari on both desktop and mobile devices. SharedArrayBuffer support is required for the WASM engine.",
      },
    ],
  },
  "jpg-to-webp": {
    title: "Convert JPG to WebP Online — Free & Private",
    description:
      "Convert JPG to WebP for smaller file sizes. No server uploads, 100% private. Reduce image size by up to 80% with modern WebP compression.",
    h1: "Convert JPG to WebP — Free, Private, Instant",
    faq: [
      {
        question: "Why should I convert JPG to WebP?",
        answer:
          "WebP typically produces files 25-50% smaller than JPG at equivalent quality. This means faster page loads and less storage usage.",
      },
      {
        question: "Is my file uploaded to a server when converting?",
        answer:
          "No. The conversion happens entirely in your browser using WebAssembly. Your files never leave your device.",
      },
      {
        question: "Will converting JPG to WebP reduce quality?",
        answer:
          "WebP supports both lossy and lossless compression. Our converter uses lossy compression optimized for web, maintaining visual quality while reducing file size significantly.",
      },
      {
        question: "What browsers support WebP images?",
        answer:
          "WebP is supported by all modern browsers including Chrome, Firefox, Edge, Safari (since macOS Big Sur), and Opera. Browser support is over 97% globally.",
      },
      {
        question: "Is there a file size limit for JPG to WebP conversion?",
        answer:
          "No server-side limit exists. Processing happens locally in your browser, so the limit depends on your device memory. Files up to 500MB work on most modern devices.",
      },
    ],
  },
  "jpg-to-gif": {
    title: "Convert JPG to GIF Online — Free & Private",
    description:
      "Convert JPG images to GIF format instantly in your browser. No uploads, completely private and free. Perfect for simple graphics and animations.",
    h1: "Convert JPG to GIF — Free, Private, Instant",
    faq: [
      {
        question: "Why convert JPG to GIF?",
        answer:
          "GIF is useful for simple graphics, images with limited colors (256 max), and when you need universal compatibility. It also supports animation for multi-frame images.",
      },
      {
        question: "Will I lose quality converting JPG to GIF?",
        answer:
          "GIF supports a maximum of 256 colors, so complex photos may lose color detail. It works best for simple graphics, logos, and images with limited color palettes.",
      },
      {
        question: "Is this converter private?",
        answer:
          "Yes, all processing happens locally in your browser. Your files are never uploaded to any server.",
      },
      {
        question: "Can I convert animated GIFs?",
        answer:
          "This converter handles static image conversion. For animated content, each frame would be processed individually.",
      },
      {
        question: "What file size limits apply?",
        answer:
          "Since processing is entirely client-side, there are no server limits. Performance depends on your device, but files up to 500MB work well.",
      },
    ],
  },
  "png-to-jpg": {
    title: "Convert PNG to JPG Online — Free & Private",
    description:
      "Convert PNG to JPG to reduce file size. No uploads, 100% private. Perfect for photos and web images where smaller size matters more than transparency.",
    h1: "Convert PNG to JPG — Free, Private, Instant",
    faq: [
      {
        question: "Why should I convert PNG to JPG?",
        answer:
          "JPG files are typically much smaller than PNG for photographic images. If you don't need transparency, converting to JPG can reduce file size by 50-80%.",
      },
      {
        question: "Will I lose the transparent background?",
        answer:
          "Yes. JPG does not support transparency. Any transparent areas will be filled with a white background. If you need transparency, keep the PNG format.",
      },
      {
        question: "Is my file kept private?",
        answer:
          "Absolutely. The conversion runs entirely in your browser. No data is sent to any server. We never see your files.",
      },
      {
        question: "What JPG quality will the output be?",
        answer:
          "The output uses high-quality JPG compression (92% quality), which provides an excellent balance between file size and visual quality.",
      },
      {
        question: "Can I batch convert multiple PNGs to JPG?",
        answer:
          "Currently, the converter processes one file at a time. You can convert multiple files sequentially without any limits.",
      },
    ],
  },
  "png-to-webp": {
    title: "Convert PNG to WebP Online — Free & Private",
    description:
      "Convert PNG to WebP for dramatically smaller files with lossless quality. No uploads, 100% private. Ideal for web performance optimization.",
    h1: "Convert PNG to WebP — Free, Private, Instant",
    faq: [
      {
        question: "Why convert PNG to WebP?",
        answer:
          "WebP with lossless compression produces files 26% smaller than PNG on average, while lossy WebP can be 50-80% smaller. This dramatically improves web page load times.",
      },
      {
        question: "Does WebP support transparency like PNG?",
        answer:
          "Yes, WebP supports both lossy and lossless compression with alpha channel (transparency). You get the same visual result with a smaller file.",
      },
      {
        question: "Is my data private during conversion?",
        answer:
          "Yes. All conversion happens in your browser using WebAssembly. Your files never leave your device and we have zero access to them.",
      },
      {
        question: "Will I lose quality converting PNG to WebP?",
        answer:
          "Not necessarily. WebP supports lossless compression that preserves exact quality while reducing file size. Even lossy WebP is often visually indistinguishable from the original PNG.",
      },
      {
        question: "What browsers support WebP?",
        answer:
          "All modern browsers support WebP: Chrome, Firefox, Edge, Safari (14+), and Opera. Global support exceeds 97%.",
      },
    ],
  },
  "webp-to-jpg": {
    title: "Convert WebP to JPG Online — Free & Private",
    description:
      "Convert WebP images to JPG format instantly in your browser. No uploads, 100% private. Perfect for compatibility with older software and devices.",
    h1: "Convert WebP to JPG — Free, Private, Instant",
    faq: [
      {
        question: "Why would I need to convert WebP to JPG?",
        answer:
          "Some older software, email clients, and devices don't support WebP. Converting to JPG ensures maximum compatibility across all platforms and applications.",
      },
      {
        question: "Will I lose quality converting WebP to JPG?",
        answer:
          "Both WebP and JPG use lossy compression, so there may be a slight quality reduction. However, at high quality settings, the difference is typically imperceptible.",
      },
      {
        question: "Is this conversion tool private?",
        answer:
          "Yes, completely. The conversion runs in your browser using WebAssembly. Your images never leave your device.",
      },
      {
        question: "Does this support animated WebP files?",
        answer:
          "This converter handles static WebP images. Animated WebP files will be converted as a single frame.",
      },
      {
        question: "What file sizes are supported?",
        answer:
          "Since processing is entirely local, there are no server limits. Files up to 500MB work well on modern devices.",
      },
    ],
  },
  "webp-to-png": {
    title: "Convert WebP to PNG Online — Free & Private",
    description:
      "Convert WebP to PNG for lossless quality and universal compatibility. No uploads, 100% private. Perfect for editing and transparency support.",
    h1: "Convert WebP to PNG — Free, Private, Instant",
    faq: [
      {
        question: "Why convert WebP to PNG?",
        answer:
          "PNG offers universal compatibility and lossless quality. If you need to edit an image, PNG is supported by virtually all image editors. PNG also preserves transparency perfectly.",
      },
      {
        question: "Will the file size increase?",
        answer:
          "Yes, PNG files are typically larger than WebP. The trade-off is maximum compatibility and lossless quality. For web use, consider keeping the WebP format.",
      },
      {
        question: "Is my file kept private during conversion?",
        answer:
          "Absolutely. All processing happens in your browser. No data is sent to any server. We never see or store your files.",
      },
      {
        question: "Does this preserve transparency?",
        answer:
          "Yes, if the original WebP has an alpha channel (transparency), it will be preserved in the PNG output perfectly.",
      },
      {
        question: "What devices does this work on?",
        answer:
          "This works on any device with a modern browser (Chrome, Firefox, Edge, Safari). The conversion runs client-side using WebAssembly.",
      },
    ],
  },
  "gif-to-png": {
    title: "Convert GIF to PNG Online — Free & Private",
    description:
      "Convert GIF to PNG for better quality and transparency. No uploads, 100% private. Perfect for extracting high-quality frames from GIF animations.",
    h1: "Convert GIF to PNG — Free, Private, Instant",
    faq: [
      {
        question: "Why convert GIF to PNG?",
        answer:
          "PNG supports full 24-bit color (vs GIF's 256 colors) and better transparency (alpha channel vs binary). PNG also uses more efficient compression for static images.",
      },
      {
        question: "Will animation be preserved?",
        answer:
          "No. PNG is a static image format. If you convert an animated GIF, only the first frame will be extracted as a PNG image.",
      },
      {
        question: "Is this conversion tool private?",
        answer:
          "Yes. All processing happens locally in your browser using WebAssembly. Your files never leave your device.",
      },
      {
        question: "Will the quality improve?",
        answer:
          "PNG supports millions of colors while GIF is limited to 256. If the original GIF had more colors that were quantized, the PNG won't recover them, but future edits won't lose more quality.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "No server limits exist since processing is local. Files up to 500MB work on modern devices with sufficient memory.",
      },
    ],
  },
  "gif-to-jpg": {
    title: "Convert GIF to JPG Online — Free & Private",
    description:
      "Convert GIF images to JPG format instantly in your browser. No uploads, 100% private. Reduce file size for photos and web-ready images.",
    h1: "Convert GIF to JPG — Free, Private, Instant",
    faq: [
      {
        question: "Why convert GIF to JPG?",
        answer:
          "JPG is ideal for photographic content with smaller file sizes than GIF. If your GIF is a static photo, JPG will produce a smaller file with better color reproduction.",
      },
      {
        question: "What happens to the animation?",
        answer:
          "JPG does not support animation. Only the first frame of an animated GIF will be converted. For static GIFs, the full image is preserved.",
      },
      {
        question: "Is this converter private?",
        answer:
          "Yes, completely. Conversion runs in your browser using WebAssembly. No files are uploaded to any server.",
      },
      {
        question: "Will I lose the transparent background?",
        answer:
          "Yes. JPG does not support transparency. Transparent areas will be replaced with a white background.",
      },
      {
        question: "Can I convert animated GIFs frame by frame?",
        answer:
          "This converter extracts the first frame as a JPG. For multi-frame extraction, you would need to process each frame separately.",
      },
    ],
  },
  "heic-to-jpg": {
    title: "Convert HEIC to JPG Online — Free & Private",
    description:
      "Convert HEIC/HEIF photos from iPhone to JPG instantly. No uploads, 100% private. Perfect for sharing Apple photos on any device or platform.",
    h1: "Convert HEIC to JPG — Free, Private, Instant",
    faq: [
      {
        question: "Why do I need to convert HEIC to JPG?",
        answer:
          "HEIC is Apple's default photo format on iOS. Many platforms, Windows devices, and older software don't support HEIC. Converting to JPG ensures universal compatibility.",
      },
      {
        question: "Is my iPhone photo kept private?",
        answer:
          "Absolutely. Your HEIC photos are processed entirely in your browser using WebAssembly. Nothing is uploaded to any server. We never see your photos.",
      },
      {
        question: "Will I lose quality converting HEIC to JPG?",
        answer:
          "Both HEIC and JPG use lossy compression. The conversion may introduce slight additional compression, but at high quality settings the difference is minimal and usually imperceptible.",
      },
      {
        question: "Can I convert Live Photos?",
        answer:
          "This converter handles the still image component of HEIC files. Live Photo video components are not processed.",
      },
      {
        question: "Does this work on iPhone and iPad?",
        answer:
          "Yes, this converter works in mobile browsers including Safari on iOS. However, for the best experience on iOS, we recommend using Chrome or Edge.",
      },
    ],
  },
  "heic-to-png": {
    title: "Convert HEIC to PNG Online — Free & Private",
    description:
      "Convert HEIC/HEIF photos from iPhone to PNG with lossless quality. No uploads, 100% private. Perfect for editing and preserving maximum image quality.",
    h1: "Convert HEIC to PNG — Free, Private, Instant",
    faq: [
      {
        question: "Why convert HEIC to PNG?",
        answer:
          "PNG provides lossless quality and universal compatibility. If you plan to edit your iPhone photos, PNG preserves every detail without further compression. It also supports transparency.",
      },
      {
        question: "Is my photo data private?",
        answer:
          "Yes. All conversion happens in your browser. Your HEIC files never leave your device. We have zero access to your photos.",
      },
      {
        question: "Will the file size increase?",
        answer:
          "Yes, PNG files are typically larger than HEIC since PNG uses lossless compression while HEIC is highly efficient lossy compression. The trade-off is perfect quality preservation.",
      },
      {
        question: "Can I batch convert HEIC files?",
        answer:
          "Currently, the converter processes one file at a time. You can convert multiple files sequentially without any daily limits.",
      },
      {
        question: "What devices support this converter?",
        answer:
          "This works on any device with a modern browser. For HEIC specifically, Chrome and Edge provide the best experience. Safari on iOS may have limitations.",
      },
    ],
  },

  "docx-to-html": {
    title: "Convert DOCX to HTML Online — Free & Private",
    description:
      "Convert Word DOCX documents to clean HTML instantly in your browser. No uploads, 100% private. Perfect for web publishing and email templates.",
    h1: "Convert DOCX to HTML — Free, Private, Instant",
    faq: [
      {
        question: "Why convert DOCX to HTML?",
        answer:
          "HTML is the language of the web. Converting DOCX to HTML lets you publish Word content online, create email templates, or integrate document content into websites and apps.",
      },
      {
        question: "Is my document kept private?",
        answer:
          "Absolutely. This converter uses mammoth.js which runs entirely in your browser. Your DOCX file never leaves your device. We have zero access to your documents.",
      },
      {
        question: "Will the HTML preserve all formatting?",
        answer:
          "Mammoth.js converts document semantics (headings, paragraphs, lists, bold, italic, tables, images) to clean HTML. Complex visual formatting, custom styles, and layout positioning are simplified to semantic HTML.",
      },
      {
        question: "Does this converter need WASM or heavy downloads?",
        answer:
          "No. This is the lightest converter we offer. Mammoth.js is only about 200KB and requires no WebAssembly. It loads and converts almost instantly.",
      },
      {
        question: "Can I convert password-protected DOCX files?",
        answer:
          "No, password-protected files cannot be converted. You would need to remove the password protection first before using this tool.",
      },
    ],
  },
  "pdf-to-jpg": {
    title: "Convert PDF to JPG Online — Free & Private",
    description:
      "Convert PDF pages to JPG images instantly in your browser. No uploads, 100% private. Perfect for sharing PDF content as viewable images.",
    h1: "Convert PDF to JPG — Free, Private, Instant",
    faq: [
      {
        question: "Why convert PDF to JPG?",
        answer:
          "JPG images are universally viewable and easy to share. Converting PDF to JPG lets you embed document content in presentations, social media, and websites without requiring a PDF viewer.",
      },
      {
        question: "Is my PDF kept private?",
        answer:
          "Yes. The conversion runs entirely in your browser using PDF.js. Your PDF file never leaves your device. We have zero access to your documents.",
      },
      {
        question: "What resolution will the JPG output be?",
        answer:
          "The converter renders PDF pages at 2x resolution (150 DPI effectively becomes 300 DPI) for crisp, high-quality output suitable for printing and digital use.",
      },
      {
        question: "Can I convert all pages of a multi-page PDF?",
        answer:
          "Yes, the converter can extract all pages as individual JPG images. Each page becomes a separate downloadable file.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "No server limits exist since processing is local in your browser. PDF files up to 500MB work well. Very large or multi-page PDFs may take longer depending on your device.",
      },
    ],
  },
  "pdf-to-png": {
    title: "Convert PDF to PNG Online — Free & Private",
    description:
      "Convert PDF pages to PNG images with lossless quality. No uploads, 100% private browser-based conversion. Perfect for high-quality document screenshots.",
    h1: "Convert PDF to PNG — Free, Private, Instant",
    faq: [
      {
        question: "Why convert PDF to PNG instead of JPG?",
        answer:
          "PNG provides lossless compression, meaning every pixel is preserved perfectly. This is ideal for documents with text, sharp lines, or when you need the highest possible quality for printing or editing.",
      },
      {
        question: "Is my PDF kept private?",
        answer:
          "Absolutely. Conversion runs entirely in your browser using PDF.js. Your file never leaves your device. We have zero access to your documents.",
      },
      {
        question: "What resolution will the PNG output be?",
        answer:
          "PDF pages are rendered at 2x resolution for crisp output. This produces high-quality PNG images suitable for both screen display and printing.",
      },
      {
        question: "Can I convert all pages of a multi-page PDF?",
        answer:
          "Yes, all pages are extracted as individual PNG images. Each page becomes a separate downloadable image file.",
      },
      {
        question: "Will the PNG files be large?",
        answer:
          "PNG files are lossless so they are larger than JPG equivalents. For text-heavy documents, PNG produces crisp results. For photo-heavy PDFs, consider the PDF to JPG option for smaller files.",
      },
    ],
  },
  "jpg-to-pdf": {
    title: "Convert JPG to PDF Online — Free & Private",
    description:
      "Convert JPG images to PDF documents instantly in your browser. No uploads, 100% private. Perfect for creating PDF documents from photos and scans.",
    h1: "Convert JPG to PDF — Free, Private, Instant",
    faq: [
      {
        question: "Why convert JPG to PDF?",
        answer:
          "PDF is ideal for sharing multiple images as a single document, ensuring consistent display across all devices. It's also the standard format for printing, submitting documents, and archival.",
      },
      {
        question: "Is my image kept private?",
        answer:
          "Yes. The conversion runs entirely in your browser using pdf-lib. Your JPG image never leaves your device. We have zero access to your files.",
      },
      {
        question: "Will the JPG quality be preserved in the PDF?",
        answer:
          "Yes. The JPG image is embedded directly into the PDF without re-compression. The visual quality in the PDF will be identical to your original JPG.",
      },
      {
        question: "What PDF page size will be used?",
        answer:
          "The PDF page size matches your image dimensions exactly, so the image fills the entire page without any borders or scaling.",
      },
      {
        question: "Can I convert multiple JPGs into one PDF?",
        answer:
          "Currently, the converter processes one image at a time. You can create a PDF from each image individually. Multi-image PDF creation may be added in the future.",
      },
    ],
  },
  "png-to-pdf": {
    title: "Convert PNG to PDF Online — Free & Private",
    description:
      "Convert PNG images to PDF documents instantly in your browser. No uploads, 100% private. Perfect for creating PDF documents from transparent PNGs and screenshots.",
    h1: "Convert PNG to PDF — Free, Private, Instant",
    faq: [
      {
        question: "Why convert PNG to PDF?",
        answer:
          "PDF is the standard format for document sharing and printing. Converting PNG to PDF lets you share images as documents that display consistently on any device.",
      },
      {
        question: "Is my PNG image kept private?",
        answer:
          "Absolutely. The conversion runs entirely in your browser using pdf-lib. Your PNG image never leaves your device. We have zero access to your files.",
      },
      {
        question: "Will transparency be preserved in the PDF?",
        answer:
          "The PNG is embedded as-is into the PDF. Most PDF viewers will display the image with a white background where transparency existed, since PDF pages are white by default.",
      },
      {
        question: "Will the PDF page match my image size?",
        answer:
          "Yes, the PDF page dimensions match your PNG image dimensions exactly. The image fills the entire page without borders or scaling.",
      },
      {
        question: "Does this require any heavy downloads?",
        answer:
          "No. pdf-lib is a lightweight JavaScript library (about 300KB) with no WASM dependency. It loads and converts almost instantly.",
      },
    ],
  },
};

export function getFormatMeta(slug: string): FormatMeta {
  return (
    meta[slug] || {
      title: "Free Online File Converter — Private & Instant",
      description:
        "Convert files instantly in your browser. No uploads, no tracking, 100% free and private.",
      h1: "Convert Files — Free, Private, Instant",
      faq: [
        {
          question: "Is this converter free?",
          answer: "Yes, completely free with no limits.",
        },
        {
          question: "Is my file kept private?",
          answer:
            "Yes, all processing happens in your browser. Your files never leave your device.",
        },
      ],
    }
  );
}
