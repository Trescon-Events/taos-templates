export interface Theme {
  title: string;
  description: string;
  icon: string;
}

export const themes: Theme[] = [
  {
    title: "Digital Banking & Neobanking",
    description:
      "Navigating the rise of digital banks, BaaS, embedded finance, branch banking evolution, and building digital-first customer experiences at scale.",
    icon: "bank",
  },
  {
    title: "AI & Emerging Technologies",
    description:
      "Agentic AI in banking, fraud detection and prevention, intelligent automation, data-driven financial products, and advanced risk analytics.",
    icon: "ai",
  },
  {
    title: "Payments Innovation & Cross-Border Finance",
    description:
      "QRIS & ASEAN payment interoperability, digital wallets, cross-border settlements, stablecoins, and the future of real-time payments.",
    icon: "payments",
  },
  {
    title: "SME & MSME Finance",
    description:
      "Digital credit solutions for 65M+ MSMEs, working capital optimisation, supply chain finance, UMKM Go Digital, and ERP-integrated lending.",
    icon: "sme",
  },
  {
    title: "Financial Inclusion & Banking the Unbanked",
    description:
      "Reaching 77M+ unbanked adults through alternative lending, alternative credit scoring, digital expansion strategies, and last-mile financial access.",
    icon: "inclusion",
  },
  {
    title: "Halal Finance & Shariah Innovation",
    description:
      "Capitalising on the growth of Sharia banking, Sukuk markets, Islamic fintech, Sharia-compliant digital products, and Islamic capital markets.",
    icon: "halal",
  },
  {
    title: "Enterprise Banking & Corporate Finance",
    description:
      "Modernising corporate treasury, B2B payments, ISO 20022 adoption, composable banking, enterprise embedded finance, and supply chain financing.",
    icon: "corporate",
  },
  {
    title: "Digital Assets & Blockchain",
    description:
      "Navigating institutional crypto adoption, real-world asset tokenisation, CBDC developments (Project Garuda), blockchain settlement infrastructure, and DeFi.",
    icon: "blockchain",
  },
  {
    title: "Regulation, Policy & Compliance",
    description:
      "Adapting to the OJK regulatory roadmap, digital banking licensing, RegTech, KYC/AML innovation, and regulatory sandboxes.",
    icon: "regulation",
  },
  {
    title: "Sustainable Finance & ESG",
    description:
      "Prioritising green bonds, climate risk in banking, ESG investment frameworks, sustainable capital markets, and energy transition finance.",
    icon: "esg",
  },
];
