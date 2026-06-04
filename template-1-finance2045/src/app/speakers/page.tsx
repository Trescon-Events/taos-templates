import type { KonfHubSpeaker } from "@/types/konfhub";
import SpeakersGrid from "./SpeakersGrid";

const SPEAKERS_URL =
  "https://api.konfhub.com/event/public/wais-f45-indonesia/speakers";

const TRACK_FILTER = "finance 2045";

async function getSpeakers(): Promise<KonfHubSpeaker[]> {
  try {
    const res = await fetch(SPEAKERS_URL, { next: { revalidate: 30 } });
    if (!res.ok) return [];

    const raw: {
      categorized?: Array<{
        category_name: string;
        speakers: KonfHubSpeaker[];
      }>;
    } = await res.json();

    const finance2045 = (raw.categorized ?? []).filter((cat) =>
      cat.category_name.toLowerCase().includes(TRACK_FILTER)
    );

    const speakers = finance2045.flatMap((cat) => cat.speakers);
    speakers.sort((a, b) => (a.speaker_order ?? 0) - (b.speaker_order ?? 0));
    return speakers;
  } catch {
    return [];
  }
}

export const revalidate = 30;

export default async function SpeakersPage() {
  const speakers = await getSpeakers();
  return <SpeakersGrid speakers={speakers} />;
}
