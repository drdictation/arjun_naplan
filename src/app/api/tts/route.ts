import { NextRequest, NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

// In-memory cache for synthesized audio buffers
const audioCache = new Map<string, Buffer>();
const MAX_CACHE_ENTRIES = 500;

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text")?.trim();
    const voice = searchParams.get("voice") || "en-AU-NatashaNeural";
    const rate = searchParams.get("rate") || "-5%"; // Relaxed instructional pace for young learners

    if (!text) {
      return NextResponse.json({ error: "Missing 'text' parameter" }, { status: 400 });
    }

    if (text.length > 500) {
      return NextResponse.json({ error: "Text exceeds maximum length of 500 characters" }, { status: 400 });
    }

    const cacheKey = `${voice}:${rate}:${text}`;
    const cached = audioCache.get(cacheKey);
    if (cached) {
      return new Response(new Uint8Array(cached), {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-TTS-Source": "cache",
        },
      });
    }

    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

    const safeText = escapeXml(text);
    const { audioStream } = tts.toStream(safeText, { rate });

    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      audioStream.on("data", (chunk: Buffer) => chunks.push(chunk));
      audioStream.on("end", () => resolve());
      audioStream.on("error", (err: Error) => reject(err));
    });

    const buffer = Buffer.concat(chunks);

    if (audioCache.size >= MAX_CACHE_ENTRIES) {
      // Evict oldest entry
      const oldestKey = audioCache.keys().next().value;
      if (oldestKey) audioCache.delete(oldestKey);
    }
    audioCache.set(cacheKey, buffer);

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-TTS-Source": "edge-neural",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "TTS synthesis failed";
    console.error("TTS API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
