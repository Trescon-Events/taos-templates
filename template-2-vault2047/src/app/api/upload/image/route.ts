import { NextRequest } from "next/server";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { removeBgAndFill, flattenOnBg } from "@/lib/removeBg";

const MAX_DIMS: Record<string, { width: number; height: number }> = {
  speaker: { width: 800, height: 800 },
  logo:    { width: 1200, height: 600 },
};

const MAX_INPUT_SIZE = 20 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) || "speaker";

    if (!file) return Response.json({ error: "No file provided" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.length > MAX_INPUT_SIZE) {
      return Response.json({ error: "File too large (max 20MB)" }, { status: 400 });
    }

    const meta = await sharp(buffer).metadata();
    if (!meta.format) return Response.json({ error: "Invalid image file" }, { status: 400 });

    const dims = MAX_DIMS[type] ?? MAX_DIMS.speaker;
    const isSpeaker = type === "speaker";

    // For speaker headshots: attempt bg removal → composite on #1e2323
    // For logos: just flatten any transparency onto #1e2323
    let processed = isSpeaker
      ? await removeBgAndFill(buffer)
      : await flattenOnBg(buffer);

    // Resize to target dimensions, preserve aspect ratio from client crop
    const compressed = await sharp(processed)
      .resize(dims.width, dims.height, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 85, effort: 4 })
      .toBuffer();

    const folder = isSpeaker ? "speakers" : "logos";
    const dir = join(process.cwd(), "public", "uploads", folder);
    mkdirSync(dir, { recursive: true });

    const filename = `${randomUUID()}.webp`;
    writeFileSync(join(dir, filename), compressed);

    return Response.json({ url: `/uploads/${folder}/${filename}` }, { status: 201 });
  } catch (err) {
    console.error("Image upload error:", err);
    return Response.json({ error: "Failed to process image" }, { status: 500 });
  }
}
