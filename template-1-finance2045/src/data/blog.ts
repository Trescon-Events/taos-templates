export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  publishDate: string;
  readTime: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
  content: string;
  coverImage: string;
  coverAlt: string;
  coverPosition?: string;
}

export const posts: BlogPost[] = [
  {
    slug: "indonesia-financial-roadmap-fourth-largest-economy-2045",
    title: "Indonesia's Financial Roadmap to the World's Fourth Largest Economy",
    category: "Macro & Policy",
    author: "Priya Natarajan",
    authorRole: "Senior Finance Correspondent",
    publishDate: "2026-06-01",
    readTime: "6 min read",
    metaDescription:
      "Indonesia aims to become the world's fourth largest economy by 2045. Here is what the financial sector must deliver to make that vision real.",
    keywords: ["Indonesia 2045", "Golden Indonesia", "GDP growth", "financial sector reform", "Indonesia Emas"],
    excerpt:
      "When President Joko Widodo unveiled the Golden Indonesia 2045 Vision, he set a target few emerging economies dare to name: a GDP of US$7.3 trillion by the country's centennial. The financial sector must be the engine.",
    coverImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=600&fit=crop&q=80",
    coverAlt: "Modern city skyline at night representing Indonesia's economic ambition and growth",
    content: `When President Joko Widodo formally unveiled the Golden Indonesia 2045 Vision in May 2019, he set a target that few emerging economies have dared to name out loud: a GDP of US$7.3 trillion and per capita income of US$25,000 by the country's centennial. Achieving it would place Indonesia among the four largest economies on earth. The arithmetic, while demanding, is not impossible — but it requires the financial sector to work as the central engine, not a passive bystander.

The baseline is sobering. Indonesia's economy has grown at roughly 5 percent annually for the better part of the last decade. To reach the 2045 target, the World Bank and government planners both estimate that the country needs to sustain 5.5 to 6 percent real GDP growth every year for twenty consecutive years. That half-percentage-point gap between current performance and requirement represents, in practice, a structural transformation of how capital flows through the economy.

The financial sector has three non-negotiable jobs to do. First, deepen credit penetration. Indonesia's credit-to-GDP ratio hovers near 35 percent — well below the 90-plus percent typical of high-income economies. Unlocking this gap requires broader bank reach, smarter collateral frameworks, and a functioning credit bureau that covers informal workers and smallholders. Second, develop long-duration capital markets. The country's infrastructure gap alone is estimated at US$1.5 trillion through 2040. Domestic bond markets, project finance structures, and institutional investors — pension funds, insurers — must be developed in tandem to fund that pipeline without over-reliance on foreign borrowing. Third, deepen the insurance and retirement savings ecosystem. Less than 3 percent of GDP currently sits in formal pension savings, exposing the country to a demographic time bomb as its working-age population peak passes in the 2030s.

The good news: the financial architecture is already shifting. The Financial Services Authority (OJK) has consolidated its supervisory mandate, absorbing capital markets and insurance under a single regulatory roof. Bank Indonesia's Blueprint for the Payment System 2025 is moving settlement infrastructure to real-time and ISO 20022 standards. The government's Indonesia Investment Authority (INA) is positioning the country as a global infrastructure fund destination.

Finance 2045 — gathering in Jakarta this July — will put these priorities at the centre of a two-day agenda with policymakers, institutional investors, and fintech builders who have direct skin in the game. The conversations starting there may be the ones that determine whether 2045 becomes a milestone or a missed opportunity.`,
  },
  {
    slug: "neobanks-digital-banking-revolution-indonesia",
    title: "The Neobank Explosion: How Digital Banks Are Rewriting Indonesia's Financial Landscape",
    category: "Digital Banking",
    author: "Aditya Wibowo",
    authorRole: "Digital Finance Analyst",
    publishDate: "2026-06-08",
    readTime: "6 min read",
    metaDescription:
      "From Bank Jago to SeaBank to Blu by BCA, Indonesia's neobanks are outgrowing legacy rivals. We map the players, the growth, and what comes next.",
    keywords: ["Bank Jago", "SeaBank", "Blu BCA", "neobanks Indonesia", "digital banking Indonesia"],
    excerpt:
      "In May 2024, digital banking transactions in Indonesia crossed IDR 5,570 trillion — a 10.82 percent year-on-year jump no branch-heavy legacy bank could match. The engines behind the surge are a new generation of neobanks.",
    coverImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=600&fit=crop&q=80",
    coverAlt: "Person using mobile banking application on smartphone",
    content: `In May 2024, digital banking transactions in Indonesia crossed IDR 5,570 trillion — a 10.82 percent year-on-year jump that no branch-heavy legacy bank could match in the same period. The engines behind that surge are not the big five state banks. They are a new generation of neobanks, each tethered to a superapp ecosystem or a technology holding company, racing each other for the same prize: the smartphone of Indonesia's 278 million people.

Bank Jago is the most closely watched. Born from the gutted hull of PT Bank Artos Indonesia, it was taken over by investor Jerry Ng and rebranded in 2020 with a singular thesis: a bank built to live inside Gojek and Gopay rather than beside them. The integration worked. Jago's deposits and loan book have grown consistently, and its model — lifestyle-linked financial pockets rather than a conventional savings account — has become a template others are copying.

SeaBank, the banking arm of Sea Group (the Singapore-listed parent of Shopee), has scaled with similar aggression. Its deep embedding inside the Shopee marketplace means millions of Indonesians already trust the brand before they open an account. By mid-2025, Indonesian digital banks as a cohort were outperforming their larger listed peers on profit growth — a signal that the unit economics are maturing faster than critics expected.

Blu by BCA Digital represents the incumbent response. Built as a fully independent subsidiary of Bank Central Asia — Indonesia's largest private bank — Blu targets digital-native users with zero-fee structures and a design language borrowed from consumer tech, not banking. That a bank of BCA's conservative reputation felt compelled to build a challenger brand from scratch tells you something about the urgency of the moment.

The field is crowded further by Superbank (backed by Grab), Allo Bank (linked to the Salim Group and Tokopedia), Raya Bank (BRI's digital spinout), and Digibank by DBS. OJK has capped the number of digital bank licences, but within that constraint, differentiation is fierce.

The central question for the next phase is not growth — it is profitability at scale without a superapp subsidy. The neobanks that survive to 2030 will be those that convert transactional relationships into full financial lives: savings, insurance, investment, and credit woven together by data. That transition from fintech feature to comprehensive bank is the defining challenge of Indonesia's digital banking decade.`,
  },
  {
    slug: "project-garuda-bank-indonesia-cbdc-digital-rupiah",
    title: "Project Garuda: Inside Bank Indonesia's Bid to Issue the World's Most Sophisticated CBDC",
    category: "Central Banking",
    author: "Rahul Menon",
    authorRole: "Central Banking Correspondent",
    publishDate: "2026-06-15",
    readTime: "7 min read",
    metaDescription:
      "Bank Indonesia's Project Garuda is building the Digital Rupiah on Hyperledger Besu. Here is what the proof of concept revealed — and what comes next.",
    keywords: ["Project Garuda", "digital rupiah", "CBDC Indonesia", "Bank Indonesia", "wholesale CBDC"],
    excerpt:
      "On 13 December 2024, Bank Indonesia published its Proof of Concept Report for Project Garuda — a 14-month exercise testing whether a sovereign digital currency could be issued at wholesale scale. The answer was yes.",
    coverImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=600&fit=crop&q=80",
    coverAlt: "Digital currency and blockchain technology visualization",
    content: `On 13 December 2024, Bank Indonesia published the Proof of Concept Report for Project Garuda's Immediate State Phase — a 14-month exercise, run from July 2023 to August 2024, that tested whether a sovereign digital currency could be issued, transferred, and redeemed at wholesale scale without breaking. The answer, the report concluded, was yes. The next question — already being asked in central bank corridors from Frankfurt to Beijing — is what Indonesia will build on top of that foundation.

Project Garuda, named for the mythological eagle that serves as Indonesia's national symbol, is Bank Indonesia's central bank digital currency programme. Its architecture is deliberately two-tier. The first tier is a wholesale digital rupiah — a tokenised liability of Bank Indonesia, accessible only to licensed commercial banks for interbank settlement. The second tier, still in design, would see those banks distribute a retail digital rupiah to consumers and businesses. The model is analogous to the way physical banknotes work: the central bank prints, commercial banks distribute.

The technical infrastructure tested two competing distributed ledger platforms: R3 Corda and Hyperledger Besu. Both were evaluated on privacy, throughput, scalability, and governance — the four dimensions that determine whether a CBDC can actually run a national payment system. Hyperledger Besu, the same infrastructure used by the Banque de France and several BIS Innovation Hub experiments, ultimately emerged as the stronger candidate for Indonesia's transaction volumes.

What makes Project Garuda genuinely novel is a financing mechanism announced by BI Governor Perry Warjiyo in 2025: the digital rupiah will be backed not merely by a central bank ledger entry but by government bonds — essentially giving the CBDC stablecoin mechanics with sovereign backing. If implemented, this would make Indonesia one of the first central banks in the world to issue a bond-collateralised digital currency, a structure that could attract international institutional interest and serve as a template for other emerging-market CBDCs.

The roadmap moves from wholesale to retail in phases. Interbank settlement first, then integration with QRIS and the national payment gateway, then — potentially — programmable money for government disbursements, such as social transfer schemes targeted at low-income households. Indonesia spends more than IDR 400 trillion annually on social protection. A programmable digital rupiah could eliminate the leakage, delay, and fraud that beset cash-based transfer programmes, turning monetary policy and fiscal policy into a single, precision instrument.`,
  },
  {
    slug: "qris-asean-payment-interoperability-cross-border",
    title: "QRIS Goes Global: How Indonesia's QR Standard Is Quietly Reshaping ASEAN Payments",
    category: "Payments",
    author: "Siti Rahayu",
    authorRole: "Payments Infrastructure Writer",
    publishDate: "2026-06-22",
    readTime: "6 min read",
    metaDescription:
      "QRIS now works across Singapore, Malaysia, Thailand, and Japan. We explain how Indonesia's QR standard became ASEAN's de facto payment backbone.",
    keywords: ["QRIS", "ASEAN payments", "cross-border QR", "payment interoperability", "digital payments Indonesia"],
    excerpt:
      "When QRIS launched in 2019, the ambition was domestic. Seven years later, it connects Singapore, Malaysia, Thailand, and Japan — and may become the plumbing of a new Asian financial order.",
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop&q=80",
    coverAlt: "Mobile payment and QR code scanning at a merchant",
    content: `When Bank Indonesia and the Indonesian Payment System Association (ASPI) launched QRIS — Quick Response Code Indonesian Standard — in 2019, the ambition was domestic: replace the jungle of competing QR codes from OVO, GoPay, Dana, and LinkAja with a single, interoperable standard. Seven years later, QRIS has become something the original designers probably did not fully anticipate — a geopolitical payments instrument.

By the first quarter of 2025, 56 million Indonesians were actively using QRIS, transacting with 38 million registered merchants across the archipelago. Of those merchants, 92.5 percent are micro, small, and medium enterprises — the backbone of an economy that runs on warung stalls, market traders, and village cooperatives. Those numbers alone would make QRIS a domestic policy success. What has elevated it to a regional story is cross-border linkage.

QRIS is now bilaterally linked to PayNow in Singapore, DuitNow in Malaysia, and PromptPay in Thailand, enabling real-time person-to-merchant and person-to-person payments without requiring currency conversion at the point of transaction — the exchange happens automatically in the background at competitive interbank rates. In 2024, a pilot cross-border QR linkage with China was tested, and on 17 August 2025 — Indonesia's 80th Independence Day — QRIS went live in Japan, making it the first non-ASEAN country to officially adopt the system.

The architecture behind these linkages is the ASEAN Regional Payment Connectivity (RPC) initiative, a multilateral framework supported by the five founding ASEAN central banks — Bank Indonesia, Bangko Sentral ng Pilipinas, Bank Negara Malaysia, Monetary Authority of Singapore, and Bank of Thailand. Under RPC, each country's national QR system is mapped to a common messaging standard, enabling any connected system to route a payment to any merchant in any participating country through a single scan.

What comes next is more ambitious. ASEAN finance ministers and central bank governors are actively discussing multi-currency settlement rails that would reduce — and eventually eliminate — the role of the US dollar as an intermediary currency in intra-ASEAN trade. If successful, this would represent the most significant shift in regional monetary architecture since the Asian financial crisis of 1997. Indonesia, as the region's largest economy and the operator of its most widely adopted QR standard, sits at the centre of that negotiation. QRIS began as a QR code. It may end up as the plumbing of a new Asian financial order.`,
  },
  {
    slug: "islamic-fintech-halal-finance-sukuk-shariah-indonesia",
    title: "Faith and Finance: The Rise of Indonesia's Islamic Fintech Sector",
    category: "Islamic Finance",
    author: "Farah Izzati",
    authorRole: "Islamic Finance Specialist",
    publishDate: "2026-06-29",
    readTime: "6 min read",
    metaDescription:
      "Indonesia has 58 Islamic fintech firms and a billion-dollar sukuk market. The halal economy is rapidly becoming a mainstream financial asset class.",
    keywords: ["Islamic fintech Indonesia", "sukuk", "shariah digital banking", "halal finance", "Bank Syariah Indonesia"],
    excerpt:
      "With 229 million Muslims, a growing middle class, and a President-chaired national committee, Indonesia is executing a deliberate push to become a global centre for Islamic finance. The momentum in 2025 suggests it is working.",
    coverImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=600&fit=crop&q=80",
    coverAlt: "Grand mosque architecture representing Islamic finance",
    content: `Indonesia is the world's most populous Muslim-majority nation — a fact that financial strategists have long noted but only recently acted on with serious institutional intent. With 229 million Muslims, a growing middle class, and a government committed at the highest level, the country is executing a deliberate push to become a global centre for Islamic finance and the halal economy. The momentum in 2024 and 2025 suggests it is working.

Bank Syariah Indonesia (BSI), formed in 2021 through the merger of three state-owned Islamic banking subsidiaries, reported a net profit increase of 33 percent in 2024 — in an environment where many conventional banks were managing margin compression. BSI now serves more than 20 million customers, making it one of the largest Islamic banks in the world by customer count. Alongside it, Bank Aladin Syariah — a fully digital, shariah-compliant neobank — had reached 3.2 million users by mid-2024, demonstrating that observant Muslims want not just compliant products but also modern user experience.

The sukuk market tells a parallel story. Indonesia has raised more than US$1 billion from retail sukuk issuances — sovereign Islamic bonds accessible to individual investors — positioning the country as one of the most active retail sukuk markets globally. These instruments are not charity products; they are competitive fixed-income alternatives structured on ijara (lease) or mudharabah (profit-sharing) principles, and they are attracting both domestic retail savers and Gulf institutional capital.

The fintech layer adds further texture. Indonesia's 58 Islamic fintech companies are active across peer-to-peer lending, digital payments, crowdfunding (termed urun dana in the local regulatory framework), and zakat management — the religious almsgiving that moves an estimated IDR 300 trillion annually through informal channels, much of which the government wants to digitise and formalise. Blockchain-based smart contracts are emerging as a natural tool for sukuk issuance automation and murabaha trade finance, reducing the legal costs that have historically made Islamic instruments expensive to structure.

The structural enabler is governance: the President chairs the National Islamic Finance Committee, giving the agenda direct executive authority. OJK has a dedicated Islamic finance supervisory unit. The Ministry of Finance issues sovereign sukuk as a routine part of its debt management calendar. What remains is the last mile — the sharia financial inclusion index sits at just 12.88 percent in the 2024 OJK survey, meaning the majority of observant Indonesians still lack access to a compliant product. Closing that gap is the defining task for the sector's next chapter.`,
  },
  {
    slug: "ai-machine-learning-indonesian-banking-fraud-credit-scoring",
    title: "The Algorithm and the Loan Officer: AI's Growing Role in Indonesian Banking",
    category: "Technology",
    author: "Budi Santoso",
    authorRole: "Fintech Technology Writer",
    publishDate: "2026-07-01",
    readTime: "6 min read",
    metaDescription:
      "Indonesian banks are deploying AI for fraud detection and credit scoring. Here is what is working and where the talent gap threatens progress.",
    keywords: ["AI banking Indonesia", "machine learning credit scoring", "fraud detection fintech", "Kredivo", "OJK AI regulation"],
    excerpt:
      "In a country where fewer than half of adults have a formal credit history, AI is rewriting who gets a loan — and the implications are as significant as mobile internet was for payments a decade ago.",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=600&fit=crop&q=80",
    coverAlt: "AI neural network and data processing visualization",
    content: `In a country where fewer than half of adults have a formal credit history, the question of who gets a loan has long been answered by proximity — proximity to a bank branch, a salaried job, land that can serve as collateral. Artificial intelligence is beginning to rewrite that equation, and the implications for Indonesian banking are as significant as the introduction of mobile internet was for payments a decade ago.

Digital lending platforms have led the charge. Kredivo, one of Indonesia's best-funded buy-now-pay-later providers, built its credit underwriting model on alternative data sources — e-commerce transaction histories, device metadata, and behavioural signals from application forms — allowing it to make near-instant credit decisions for customers who would be invisible to a conventional bureau score. Akulaku deployed similar methodologies, extending credit to thin-file borrowers across the archipelago. Both companies demonstrated that machine learning could function as a substitute for the credit infrastructure that Indonesia lacks, rather than merely an optimisation of the one that exists.

Legacy banks have followed, at different speeds. BRI, which serves the largest agricultural and rural customer base of any Indonesian bank, has invested heavily in machine learning-based credit models to reach smallholder farmers whose seasonal income patterns confound traditional scoring models. Mandiri and BCA have deployed AI-driven transaction monitoring systems to detect fraud in real time — a necessity given that digital transaction volumes have grown faster than the compliance headcount needed to review them manually.

OJK has formalised the direction of travel. Regulation POJK No. 13/POJK.02/2018 on Digital Financial Innovation requires regulated institutions implementing AI for credit or risk decisions to maintain explainability and audit trails — a standard that pushes banks toward transparent models rather than black-box deep learning systems. The government has backed this with an IDR 500 billion allocation to support fintech startups developing AI solutions for financial services.

The bottleneck is human capital. Indonesia currently has approximately 10,000 working data scientists against a projected demand of 30,000 — a gap that cannot be closed by the market alone and that universities are only beginning to address at scale. Talent pipelines, international partnerships, and reskilling programmes inside banks will determine the pace of AI adoption more than regulatory permission or venture capital will. The algorithm is ready. The question is whether Indonesia can train enough people to run it well.`,
  },
  {
    slug: "financial-inclusion-indonesia-unbanked-adults",
    title: "Banking the Unbanked: Indonesia's Race to Reach 77 Million Adults Left Behind",
    category: "Financial Inclusion",
    author: "Dewi Kusuma",
    authorRole: "Financial Inclusion Reporter",
    publishDate: "2026-07-06",
    readTime: "7 min read",
    metaDescription:
      "Indonesia has the world's fourth-largest unbanked population. OJK's 2024 data shows the gaps — and the fintech, mobile, and policy tools closing them.",
    keywords: ["financial inclusion Indonesia", "unbanked Indonesia", "OJK financial literacy", "rural banking Indonesia", "digital financial access"],
    excerpt:
      "The World Bank placed Indonesia's unbanked adult population at 97.74 million in 2021. By 2024, meaningful progress had been made — but 65–77 million adults remain outside the formal financial system. Here is who they are, and what is changing.",
    coverImage: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=1200&h=600&fit=crop&q=80",
    coverAlt: "Mobile banking and digital financial access",
    content: `The World Bank's Global Findex database placed Indonesia's unbanked adult population at 97.74 million as of 2021 — the fourth largest in the world, behind only China, India, and Pakistan. By 2024, OJK's National Survey on Financial Literacy and Inclusion (SNLIK) recorded a financial inclusion index of 75.02 percent, suggesting meaningful progress: the gap had narrowed to somewhere between 65 and 77 million adults, depending on the methodology used. The progress is real. The remaining gap is stubborn — and understanding why it is stubborn matters more than celebrating the headline number.

The 2024 SNLIK data reveals a structural portrait of exclusion. Financial inclusion among urban residents stands at 78.41 percent; in rural areas, it falls to 70.13 percent. Among farmers, fisherfolk, and agricultural workers, the index drops to 62.26 percent. The unemployed are at 55.10 percent. These are not random gaps — they map precisely onto the groups that formal financial institutions have historically found unprofitable to serve: geographically remote, income-irregular, collateral-poor, and often operating in the informal economy where cash is the default and trust in institutions is low.

Three approaches are closing the distance. The first is agent banking. BRI's BRILink network — a system of 700,000-plus village-level agents who carry out basic banking transactions on behalf of the bank — has become one of the most studied agent banking models in the developing world. Agents are typically local shopkeepers or community figures, meaning the trust deficit between rural customers and distant institutions is bridged by a familiar face. The second is mobile wallets used without a full bank account. GoPay, OVO, Dana, and LinkAja collectively serve tens of millions of users who have never opened a conventional savings account — a form of financial access that falls outside the formal inclusion index but is economically meaningful nonetheless. The third is government G2P (government-to-person) payment digitisation. The Programme Keluarga Harapan (PKH) conditional cash transfer scheme reaches over 10 million poor households; when disbursements shift from cash envelopes to digital wallets, recipients are pulled into the formal financial system as a by-product of social protection.

The financial literacy index — at 65.43 percent in 2024 — trails the inclusion index, which is unusual. People are gaining access to products they do not yet fully understand. That gap creates risk: mis-selling, over-indebtedness, and fraud targeting newly-banked customers are already visible problems. Closing Indonesia's inclusion gap without a parallel literacy investment would be building a financial system on sand. The race to bank the unbanked is also, necessarily, a race to educate them.`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  return posts.filter((p) => p.slug !== slug).slice(0, count);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
