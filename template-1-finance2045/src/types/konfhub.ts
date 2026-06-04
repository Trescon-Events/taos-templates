export interface KonfHubSpeaker {
  speaker_id: number;
  name: string;
  about: string; // HTML string
  image_url: string;
  organisation_logo_url: string;
  designation: string;
  organisation: string;
  location: string;
  linkedin_url: string;
  facebook_url: string;
  twitter_url: string;
  website_url: string;
  speaker_category_id: number;
  speaker_order: number;
  tags: string[];
  sessions: Array<{
    session_id: number;
    session_title: string;
    start_timestamp: string;
    end_timestamp: string;
  }>;
}

export interface KonfHubSession {
  session_id: number;
  session_type: number;
  session_title: string;
  session_description: string;
  session_speakers: Array<{
    speaker_id: number;
    name: string;
    designation: string;
    organisation: string;
    image_url: string;
  }>;
  start_timestamp: string; // "2026-07-07 01:00:00" (UTC)
  end_timestamp: string;
  session_location: string;
  session_colour: string;
  session_order: number;
  tags: string[];
}

export interface KonfHubTrack {
  track_id: number;
  track_title: string;
  track_description: string;
  track_sessions: KonfHubSession[];
  track_date: string;
  start_time: string;
  end_time: string;
  track_order: number;
}
