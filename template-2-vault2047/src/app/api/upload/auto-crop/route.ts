import { NextRequest } from "next/server";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { removeBgAndFill, flattenOnBg } from "@/lib/removeBg";

const MAX_INPUT_SIZE = 20 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) || "speaker";

    if (!file) return Response.json({ error: "No file" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.length > MAX_INPUT_SIZE) {
      return Response.json({ error: "File too large (max 20MB)" }, { status: 400 });
    }

    const meta = await sharp(buffer).metadata();
    if (!meta.format) return Response.json({ error: "Invalid image" }, { status: 400 });

    const isLogo = type === "logo";
    const outW = isLogo ? 1200 : 800;
    const outH = isLogo ? 600 : 800;

    // Remove background (speaker) or flatten transparency (logo) → #1e2323 base
    const bgRemoved = isLogo
      ? await flattenOnBg(buffer)
      : await removeBgAndFill(buffer);

    // Smart attention crop to final dimensions
    const compressed = await sharp(bgRemoved)
      .resize(outW, outH, {
        fit: "cover",
        position: "attention",
      })
      .webp({ quality: 85, effort: 4 })
      .toBuffer();

    const folder = isLogo ? "logos" : "speakers";
    const dir = join(process.cwd(), "public", "uploads", folder);
    mkdirSync(dir, { recursive: true });

    const filename = `${randomUUID()}.webp`;
    writeFileSync(join(dir, filename), compressed);

    return Response.json({ url: `/uploads/${folder}/${filename}` }, { status: 201 });
  } catch (err) {
    console.error("Auto-crop error:", err);
    return Response.json({ error: "Failed to process image" }, { status: 500 });
  }
}
