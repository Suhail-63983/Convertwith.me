export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function getMimeType(format: string): string {
  const mimeMap: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    heic: "image/heic",
    heif: "image/heic",
    pdf: "application/pdf",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    html: "text/html",
  };
  return mimeMap[format.toLowerCase()] || "application/octet-stream";
}

export function getAcceptAttribute(format: string): string {
  const mime = getMimeType(format);
  if (format === "jpg" || format === "jpeg") {
    return "image/jpeg,.jpg,.jpeg";
  }
  if (format === "heic" || format === "heif") {
    return "image/heic,image/heif,.heic,.heif";
  }
  if (format === "pdf") {
    return "application/pdf,.pdf";
  }
  if (format === "docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx";
  }
  return `${mime},.${format}`;
}

export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1) return "";
  return filename.substring(lastDot + 1).toLowerCase();
}

export function isValidFileType(file: File, expectedFormat: string): boolean {
  const extension = getFileExtension(file.name);
  const expectedMime = getMimeType(expectedFormat);

  if (extension === expectedFormat.toLowerCase()) return true;
  if (expectedFormat === "jpg" && (extension === "jpg" || extension === "jpeg"))
    return true;
  if (
    expectedFormat === "heic" &&
    (extension === "heic" || extension === "heif")
  )
    return true;

  if (file.type && file.type === expectedMime) return true;
  if (expectedFormat === "jpg" && file.type === "image/jpeg") return true;

  return false;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function checkSharedArrayBufferSupport(): boolean {
  return typeof SharedArrayBuffer !== "undefined";
}
