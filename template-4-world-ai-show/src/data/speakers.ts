// ─────────────────────────────────────────────────────────────────────────────
// SPEAKERS DATA
// To add a new speaker:
//   1. Drop their photo into /public/images/  (name it e.g. speaker-jane-doe.png)
//   2. Add one entry to the array below
//   3. Save — the Speakers section on the home page and the /speakers page
//      both update automatically
// ─────────────────────────────────────────────────────────────────────────────

export type Speaker = {
  name:    string;
  title:   string;
  org:     string;
  img:     string;     // path from /public  e.g. "/images/speaker-jane-doe.png"
  keynote: boolean;    // true = highlighted as keynote speaker
  topic?:  string;     // optional session topic / talk title
};

export const speakers: Speaker[] = [
  {
    name:    "Sujala Pant",
    title:   "Deputy Resident Representative",
    org:     "UNDP Indonesia",
    img:     "/images/speaker-sujala-pant.png",
    keynote: true,
  },
  {
    name:    "Vivi Yulaswati",
    title:   "Senior Advisor",
    org:     "Bappenas",
    img:     "/images/speaker-vivi-yulaswati.png",
    keynote: true,
  },
  {
    name:    "Eryk Budi Pratama",
    title:   "Vice Chairman, AI & PDP",
    org:     "KADIN Indonesia",
    img:     "/images/speaker-eryk-pratama.png",
    keynote: false,
  },
  {
    name:    "Arief Setiawan",
    title:   "Chief Technology Officer",
    org:     "PT Asian Bulk Logistics",
    img:     "/images/speaker-arief-setiawan.png",
    keynote: false,
  },
  {
    name:    "Dian Martin",
    title:   "Chairman",
    org:     "Indonesian AI Association",
    img:     "/images/speaker-dian-martin.png",
    keynote: false,
  },
  {
    name:    "Nicholas T.",
    title:   "Head of Retail Banking",
    org:     "PT Bank Jago Tbk",
    img:     "/images/speaker-nicholas-t.png",
    keynote: false,
  },
  {
    name:    "Andre E. Susanto",
    title:   "Chief Technology Officer",
    org:     "Quantum Power Asia",
    img:     "/images/speaker-andre-susanto.png",
    keynote: false,
  },
  {
    name:    "Wempi Saputra",
    title:   "Senior Government Official",
    org:     "Government of Indonesia",
    img:     "/images/speaker-wempi-saputra.png",
    keynote: false,
  },
  {
    name:    "Arie Purwanto",
    title:   "Director, Digital Transformation",
    org:     "Government of Indonesia",
    img:     "/images/speaker-arie-purwanto.png",
    keynote: false,
  },
];
