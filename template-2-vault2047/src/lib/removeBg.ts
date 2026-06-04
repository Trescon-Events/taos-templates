import sharp from "sharp";

const BG_COLOR = { r: 30, g: 35, b: 35 }; // #1e2323

/**
 * Attempt to remove the background of an image using the remove.bg API,
 * then composite the subject onto a solid #1e2323 background.
 *
 * If REMOVEBG_API_KEY is not set, returns the original buffer unchanged.
 */
export async function removeBgAndFill(buffer: Buffer): Promise<Buffer> {
  const apiKey = process.env.REMOVEBG_API_KEY;
  if (!apiKey) return buffer; // no key → skip, server just does attention crop

  const formData = new FormData();
  // Copy into a plain ArrayBuffer to avoid SharedArrayBuffer type mismatch
  const ab = new ArrayBuffer(buffer.length);
  new Uint8Array(ab).set(buffer);
  formData.append("image_file", new Blob([ab]), "image.jpg");
  formData.append("size", "auto");

  const res = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": apiKey },
    body: formData,
  });

  if (!res.ok) {
    // API error (quota exceeded, etc.) — fall back to original
    console.warn("remove.bg API error:", res.status, await res.text());
    return buffer;
  }

  // remove.bg returns a transparent PNG
  const transparentPng = Buffer.from(await res.arrayBuffer());

  // Composite subject onto #1e2323 solid background
  // Get subject dimensions to size the canvas correctly
  const subjectMeta = await sharp(transparentPng).metadata();
  const subjectW = subjectMeta.width ?? 800;
  const subjectH = subjectMeta.height ?? 800;

  const withBg = await sharp({
    create: {
      width: subjectW,
      height: subjectH,
      channels: 3,
      background: BG_COLOR,
    },
  })
    .composite([{ input: transparentPng }])
    .png()
    .toBuffer();

  return withBg;
}

/**
 * Place any image (with or without transparency) onto a #1e2323 background.
 * Used when bg removal is skipped — at minimum, transparent areas become #1e2323.
 */
export async function flattenOnBg(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .flatten({ background: BG_COLOR })
    .toBuffer();
}
