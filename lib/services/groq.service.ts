import Groq from "groq-sdk";

import { TranscriptSegment } from "@/types/database.types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

interface TranscriptionWithSegments {
  text: string;
  segments?: Array<{
    start?: number;
    end?: number;
    text?: string;
  }>;
}

export async function transcribeAudio(audioUrl: string): Promise<{
  text: string;
  segments: TranscriptSegment[];
}> {
  const res = await fetch(audioUrl);
  const buffer = Buffer.from(await res.arrayBuffer());

  const file = new File([buffer], "audio.mp3", { type: "audio/mpeg" });

  const result = (await groq.audio.transcriptions.create({
    file,
    model: "whisper-large-v3",
    response_format: "verbose_json",
    timestamp_granularities: ["segment"],
  })) as TranscriptionWithSegments;

  const segments: TranscriptSegment[] = (result.segments ?? []).map((s) => ({
    start: s.start ?? 0,
    end: s.end ?? 0,
    text: s.text ?? "",
  }));

  return { text: result.text, segments };
}
