export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "super_admin" | "event_admin" | "contributor";
  permissions: {
    speakers: boolean;
    partners: boolean;
    exhibitors: boolean;
    testimonials: boolean;
    blogs: boolean;
    agenda: boolean;
  };
  active: boolean;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  org: string;
  country: string;
  countryFlag: string;
  tier: "national" | "global" | "enterprise";
  session: string;
  photo: string;
  bio: string;
  linkedin: string;
  status: "pending" | "approved" | "rejected";
  rejectionNote: string;
  active: boolean;
  order: number;
  phone: string;
  dialCode: string;
  email: string;
  company: string;
  industry: string;
  city: string;
  companyLogo: string;
  quote: string;
  assistantName: string;
  assistantEmail: string;
  assistantPhone: string;
  konfhubBookingId?: string;   // set after successful KonfHub registration
}

export interface IndustrySector {
  id: string;
  label: string;
  order: number;
  active: boolean;
}

export interface Partner {
  id: string;
  name: string;
  tier: "platinum" | "gold" | "silver" | "startup" | "media" | "association" | "government";
  logo: string;
  website: string;
  status: "pending" | "approved" | "rejected";
  rejectionNote: string;
  active: boolean;
  order: number;
}

export interface Exhibitor {
  id: string;
  name: string;
  category: string;
  logo: string;
  website: string;
  status: "pending" | "approved" | "rejected";
  rejectionNote: string;
  active: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  role: string;
  org: string;
  status: "pending" | "approved" | "rejected";
  rejectionNote: string;
  active: boolean;
  order: number;
}

export interface BlogPost {
  id: string;
  type: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
  status: "pending" | "approved" | "rejected";
  rejectionNote: string;
  active: boolean;
  order: number;
}

export interface AgendaItem {
  id: string;
  day: string;
  time: string;
  title: string;
  description: string;
  speaker: string;
  type: "keynote" | "panel" | "workshop" | "networking" | "break" | "other";
  status: "pending" | "approved" | "rejected";
  rejectionNote: string;
  active: boolean;
  order: number;
}

export interface DB {
  speakers: Speaker[];
  partners: Partner[];
  exhibitors: Exhibitor[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
}
