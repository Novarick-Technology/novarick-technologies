"use server";

import { put } from "@vercel/blob";
import sharp from "sharp";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_FORMATS = new Set(["jpeg", "png", "webp"]);

export type UploadImageResult = { url: string } | { error: string };

/**
 * Shared by the project and post editors' ImageUpload component per
 * ADMIN.md — accept JPEG/PNG/WebP, cap 8MB, convert to WebP, store two
 * widths (1440 desktop / 780 mobile crop reference). Only the 1440 URL is
 * returned/stored — Project/Post only have one coverUrl column, and
 * next/image resizes down from that source for smaller renditions.
 * File type is verified from the actual decoded image (sharp's metadata),
 * never the filename or client-supplied MIME type.
 */
export async function uploadImage(formData: FormData): Promise<UploadImageResult> {
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { error: "No file provided." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "File is larger than 8MB." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let format: string | undefined;
  try {
    const metadata = await sharp(buffer).metadata();
    format = metadata.format;
  } catch {
    return { error: "Could not read this file as an image." };
  }
  if (!format || !ALLOWED_FORMATS.has(format)) {
    return { error: "Only JPEG, PNG and WebP images are accepted." };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { error: "Image storage isn't configured yet (BLOB_READ_WRITE_TOKEN missing)." };
  }

  const base = crypto.randomUUID();

  try {
    const [desktopBuffer, mobileBuffer] = await Promise.all([
      sharp(buffer).resize({ width: 1440, withoutEnlargement: true }).webp().toBuffer(),
      sharp(buffer).resize({ width: 780, withoutEnlargement: true }).webp().toBuffer(),
    ]);
    const [desktopBlob] = await Promise.all([
      put(`${base}-1440.webp`, desktopBuffer, { access: "public", contentType: "image/webp" }),
      put(`${base}-780.webp`, mobileBuffer, { access: "public", contentType: "image/webp" }),
    ]);

    return { url: desktopBlob.url };
  } catch {
    return { error: "Upload failed. Please try again." };
  }
}
