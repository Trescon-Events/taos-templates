export interface Sponsor {
  name: string;
  logo: string;
  logoW: number;
  logoH: number;
  tier: string;
  tagline?: string;
  description?: string;
  website?: string;
}

export const sponsors: Sponsor[] = [
  {
    name: "SC Ventures",
    logo: "/brand-scventures.webp",
    logoW: 180,
    logoH: 44,
    tier: "Platinum Partner",
    tagline: "The innovation and ventures arm of Standard Chartered.",
    description:
      "SC Ventures is the innovation, fintech investment and ventures arm of Standard Chartered. They invest in, incubate and partner with innovators to unlock new business models and opportunities across the financial services sector.",
    website: "https://www.sc.com/en/innovation-ventures/sc-ventures/",
  },
  {
    name: "Sumsub",
    logo: "/brand-sumsub.webp",
    logoW: 160,
    logoH: 44,
    tier: "Gold Partner",
    tagline: "Full-cycle verification platform for KYC/AML compliance.",
    description:
      "Sumsub is a full-cycle verification platform enabling businesses to comply with KYC/AML regulations globally. Their suite covers identity verification, business verification, transaction monitoring and fraud prevention.",
    website: "https://sumsub.com",
  },
  {
    name: "Komainu",
    logo: "/brand-komainu.webp",
    logoW: 160,
    logoH: 44,
    tier: "Gold Partner",
    tagline: "Institutional-grade digital asset custody.",
    description:
      "Komainu is a regulated digital asset custodian built for institutional investors. Founded by Nomura, CoinShares and Ledger, Komainu delivers enterprise-grade security for crypto custody with regulatory compliance at its core.",
    website: "https://komainu.com",
  },
  {
    name: "Mastercard",
    logo: "/brand-mastercard.webp",
    logoW: 80,
    logoH: 60,
    tier: "Platinum Partner",
    tagline: "Connecting the world through payment technology.",
    description:
      "Mastercard is a global leader in digital payments and financial inclusion. Their technology connects billions of consumers, financial institutions, merchants, governments and businesses worldwide.",
    website: "https://www.mastercard.com",
  },
  {
    name: "Montran",
    logo: "/brand-montran.webp",
    logoW: 160,
    logoH: 44,
    tier: "Silver Partner",
    tagline: "Enterprise payment and capital markets infrastructure.",
    description:
      "Montran provides mission-critical software for payment systems, capital markets and central banking. Their platforms power national payment infrastructures, real-time gross settlement systems and securities depositories.",
    website: "https://www.montran.com",
  },
];
