"use client";
import { useRef, useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";

interface Props {
  value: string;
  onChange: (url: string) => void;
  type?: "speaker" | "logo";
  label?: string;
}

// 1:1 for headshots, 2:1 for logos
const ASPECTS = { speaker: 1, logo: 2 };

// Crop the canvas to the selected region and return a blob
async function getCroppedBlob(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageSrc;
  });
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob(b => b ? resolve(b) : reject(new Error("Empty canvas")), "image/jpeg", 0.95)
  );
}

// Try browser-native face detection (Chrome/Edge only via Shape Detection API)
async function detectFace(img: HTMLImageElement): Promise<{ cx: number; cy: number } | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const FD = (window as any).FaceDetector;
    if (!FD) return null;
    const detector = new FD({ fastMode: true, maxDetectedFaces: 1 });
    const faces: Array<{ boundingBox: DOMRectReadOnly }> = await detector.detect(img);
    if (!faces.length) return null;
    const b = faces[0].boundingBox;
    // Normalised face centre (0–1 each axis)
    return {
      cx: (b.x + b.width / 2) / img.naturalWidth,
      cy: (b.y + b.height / 2) / img.naturalHeight,
    };
  } catch {
    return null;
  }
}

// Convert a normalised face-centre position to react-easy-crop initial offset.
// react-easy-crop crop.{x,y} is the *image offset in pixels inside the container*.
// We approximate: container fills the modal div, so we use percentages → pixels via
// the known container dimensions.
function faceToInitialCrop(cx: number, cy: number, containerW: number, containerH: number, naturalW: number, naturalH: number, zoom: number) {
  // How many pixels of image fit inside container at current zoom?
  const scale = Math.min(containerW / naturalW, containerH / naturalH) * zoom;
  const renderedW = naturalW * scale;
  const renderedH = naturalH * scale;
  // Face centre in rendered-image pixels, relative to rendered-image top-left
  const facePxX = cx * renderedW;
  const facePxY = cy * renderedH;
  // To centre the face: shift image so face lands at container centre
  const offsetX = containerW / 2 - facePxX;
  const offsetY = containerH / 2 - facePxY;
  return { x: offsetX, y: offsetY };
}

export default function ImageUpload({ value, onChange, type = "speaker", label = "Photo" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autoRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [autoUploading, setAutoUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [detecting, setDetecting] = useState(false);

  // Crop editor state
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const aspect = ASPECTS[type];
  // Container size matches the modal crop area below
  const containerW = type === "logo" ? 600 : 420;
  const containerH = type === "logo" ? 300 : 420;

  // ── Load file into crop editor (with auto-position) ─────────────────────
  async function loadIntoCropper(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, HEIC, WebP…)");
      return;
    }
    setError("");
    setDetecting(true);

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Load image to get natural dimensions + run face detection
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = dataUrl;
    });

    // Initial zoom — for portraits, zoom in a bit so face fills the frame
    const isPortrait = img.naturalHeight > img.naturalWidth * 1.2;
    const initialZoom = isPortrait ? 1.35 : 1;

    // Attempt face detection
    const face = await detectFace(img);
    let initialCrop = { x: 0, y: 0 };

    if (face) {
      // Face found — centre crop on detected face
      initialCrop = faceToInitialCrop(face.cx, face.cy, containerW, containerH, img.naturalWidth, img.naturalHeight, initialZoom);
    } else if (isPortrait) {
      // Heuristic for portraits: face is usually in upper-centre third
      initialCrop = faceToInitialCrop(0.5, 0.28, containerW, containerH, img.naturalWidth, img.naturalHeight, initialZoom);
    }

    setCropSrc(dataUrl);
    setCrop(initialCrop);
    setZoom(initialZoom);
    setDetecting(false);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) loadIntoCropper(file);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadIntoCropper(file);
  }

  // ── Auto-headshot: send raw file → server Sharp attention crop ──────────
  async function onAutoFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    if (!file.type.startsWith("image/")) { setError("Please select an image file"); return; }
    setAutoUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("type", type);
      const res = await fetch("/api/upload/auto-crop", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Auto-crop failed"); }
      else { onChange(data.url); }
    } catch { setError("Upload failed — please try again"); }
    finally { setAutoUploading(false); }
  }

  const onCropComplete = useCallback((_: Area, pixelCrop: Area) => {
    setCroppedArea(pixelCrop);
  }, []);

  // ── Confirm manual crop → compress → upload ──────────────────────────────
  async function confirmCrop() {
    if (!cropSrc || !croppedArea) return;
    setUploading(true);
    setError("");
    try {
      const blob = await getCroppedBlob(cropSrc, croppedArea);
      const fd = new FormData();
      fd.append("file", blob, "image.jpg");
      fd.append("type", type);
      const res = await fetch("/api/upload/image", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Upload failed"); }
      else { onChange(data.url); setCropSrc(null); }
    } catch { setError("Upload failed — please try again"); }
    finally { setUploading(false); }
  }

  function cancelCrop() { setCropSrc(null); setError(""); }

  // ── Reopen crop for an existing image (re-position) ──────────────────────
  async function reopenFromUrl() {
    setError("");
    try {
      const res = await fetch(`/api/upload/proxy?url=${encodeURIComponent(value)}`);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = reject;
        r.readAsDataURL(blob);
      });
      // Create a synthetic File and load into cropper with auto-position
      const syntheticFile = new File([blob], "image.jpg", { type: blob.type });
      // Load dataUrl directly instead to skip FileReader round-trip
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image(); i.onload = () => resolve(i); i.onerror = reject; i.src = dataUrl;
      });
      const isPortrait = img.naturalHeight > img.naturalWidth * 1.2;
      const initialZoom = isPortrait ? 1.35 : 1;
      const face = await detectFace(img);
      let initialCrop = { x: 0, y: 0 };
      if (face) {
        initialCrop = faceToInitialCrop(face.cx, face.cy, containerW, containerH, img.naturalWidth, img.naturalHeight, initialZoom);
      } else if (isPortrait) {
        initialCrop = faceToInitialCrop(0.5, 0.28, containerW, containerH, img.naturalWidth, img.naturalHeight, initialZoom);
      }
      void syntheticFile; // not needed, dataUrl already available
      setCropSrc(dataUrl);
      setCrop(initialCrop);
      setZoom(initialZoom);
    } catch {
      // External CORS issue → open file picker for replacement
      inputRef.current?.click();
    }
  }

  // ─────────────────────────────────────────────────────────────────────────

  const inputBase: React.CSSProperties = {
    width: "100%", padding: "8px 12px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(240,237,232,0.12)",
    borderRadius: 6, color: "rgba(240,237,232,0.9)",
    fontSize: 12, outline: "none", boxSizing: "border-box",
  };

  return (
    <>
      <div>
        <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(240,237,232,0.5)", marginBottom: 8 }}>
          {label}
        </label>

        {/* Upload buttons row */}
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          {/* Manual crop */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={detecting || autoUploading}
            style={{ flex: 1, padding: "9px 14px", background: "#E07B2C", border: "none", borderRadius: 6, color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", letterSpacing: "0.05em", minWidth: 140 }}
          >
            {detecting ? "Detecting…" : value ? "Replace & Crop" : "Upload & Crop"}
          </button>

          {/* Auto headshot — server-side attention crop */}
          <button
            type="button"
            onClick={() => autoRef.current?.click()}
            disabled={detecting || autoUploading}
            title="Automatically detects the subject and crops the image — great for headshots"
            style={{ flex: 1, padding: "9px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(240,237,232,0.15)", borderRadius: 6, color: "rgba(240,237,232,0.7)", fontWeight: 600, fontSize: 12, cursor: "pointer", minWidth: 140 }}
          >
            {autoUploading ? "Processing…" : "⚡ Auto Headshot"}
          </button>
        </div>

        <input ref={inputRef}  type="file" accept="image/*" onChange={onFileChange}     style={{ display: "none" }} />
        <input ref={autoRef}   type="file" accept="image/*" onChange={onAutoFileChange} style={{ display: "none" }} />

        {/* Preview row (when image exists) */}
        {value && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <img
              src={value}
              alt="Current"
              style={{ width: type === "logo" ? 140 : 72, height: 72, objectFit: "cover", borderRadius: 6, border: "1px solid rgba(240,237,232,0.12)", background: "#111" }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "rgba(240,237,232,0.4)", marginBottom: 6 }}>Current image</div>
              <button
                type="button"
                onClick={reopenFromUrl}
                style={{ padding: "5px 14px", fontSize: 11, fontWeight: 700, background: "transparent", border: "1px solid rgba(224,123,44,0.35)", borderRadius: 4, color: "#E07B2C", cursor: "pointer" }}
              >
                Edit / Reposition
              </button>
            </div>
          </div>
        )}

        {/* Drop zone (no image yet) */}
        {!value && (
          <div
            style={{
              border: `2px dashed ${dragOver ? "#E07B2C" : "rgba(240,237,232,0.1)"}`,
              borderRadius: 8, padding: "20px 16px", textAlign: "center",
              cursor: "pointer", transition: "border-color 0.2s",
              background: dragOver ? "rgba(224,123,44,0.05)" : "rgba(255,255,255,0.02)",
              marginBottom: 10,
            }}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
          >
            <div style={{ fontSize: 22, marginBottom: 6, opacity: 0.35 }}>⬆</div>
            <div style={{ fontSize: 12, color: "rgba(240,237,232,0.45)" }}>
              Drop image here or click <span style={{ color: "#E07B2C", fontWeight: 600 }}>Upload & Crop</span>
            </div>
            <div style={{ fontSize: 10, color: "rgba(240,237,232,0.25)", marginTop: 4 }}>
              Any format · Any size · Face auto-detected where supported
            </div>
          </div>
        )}

        {/* URL paste fallback */}
        <input
          type="url"
          placeholder="Or paste an image URL"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={inputBase}
        />

        {error && <div style={{ marginTop: 6, fontSize: 11, color: "#f87171" }}>{error}</div>}
      </div>

      {/* ── Crop Modal ──────────────────────────────────────────────────────── */}
      {cropSrc && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(0,0,0,0.92)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          {/* Hint */}
          <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#E07B2C", marginBottom: 12, fontWeight: 700 }}>
            {type === "speaker" ? "POSITION HEADSHOT · 1:1 SQUARE" : "POSITION LOGO · 2:1 WIDE"}
          </div>
          <div style={{ fontSize: 11, color: "rgba(240,237,232,0.35)", marginBottom: 16 }}>
            {detecting ? "Detecting face…" : "Drag to reposition · scroll or slider to zoom"}
          </div>

          {/* Cropper canvas */}
          <div style={{
            position: "relative",
            width: containerW, height: containerH,
            borderRadius: 8, overflow: "hidden", background: "#000",
          }}>
            <Cropper
              image={cropSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: { borderRadius: 8 },
                cropAreaStyle: {
                  border: "2px solid #E07B2C",
                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)",
                },
              }}
            />
          </div>

          {/* Zoom slider */}
          <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, color: "rgba(240,237,232,0.35)", userSelect: "none" }}>—</span>
            <input
              type="range" min={1} max={3} step={0.01}
              value={zoom}
              onChange={e => setZoom(Number(e.target.value))}
              style={{ width: 220, accentColor: "#E07B2C" }}
            />
            <span style={{ fontSize: 13, color: "rgba(240,237,232,0.35)", userSelect: "none" }}>+</span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
            <button
              type="button"
              onClick={cancelCrop}
              style={{ padding: "10px 24px", background: "transparent", border: "1px solid rgba(240,237,232,0.15)", borderRadius: 6, color: "rgba(240,237,232,0.5)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmCrop}
              disabled={uploading}
              style={{
                padding: "10px 36px",
                background: uploading ? "rgba(224,123,44,0.4)" : "#E07B2C",
                border: "none", borderRadius: 6,
                color: "#fff", fontSize: 13, fontWeight: 700,
                cursor: uploading ? "not-allowed" : "pointer",
                minWidth: 180,
              }}
            >
              {uploading ? "Uploading…" : "Use This Crop"}
            </button>
          </div>

          {error && <div style={{ marginTop: 12, fontSize: 12, color: "#f87171" }}>{error}</div>}
        </div>
      )}
    </>
  );
}
