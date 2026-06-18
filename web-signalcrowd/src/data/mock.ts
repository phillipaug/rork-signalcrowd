import type {
  IndexItem,
  Forecast,
  ForecasterProfile,
  Report,
  CategoryAccuracy,
  Category,
} from "./types";

/** Deterministic pseudo-random series generator for mock charts. */
function series(seed: number, count: number, base: number, drift: number, vol: number): number[] {
  const out: number[] = [];
  let v = base;
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    v = Math.max(2, Math.min(99, v + drift + (r - 0.5) * vol));
    out.push(Math.round(v * 10) / 10);
  }
  return out;
}

export const CATEGORIES: Category[] = [
  "AI",
  "Crypto",
  "Housing",
  "Economy",
  "Startups",
  "Energy",
  "Geopolitics",
  "Technology",
  "Consumer",
  "Healthcare",
];

export const GLOBAL_SIGNAL = {
  score: 74,
  weeklyChange: 4.8,
  subtitle:
    "Crowd confidence is rising across AI, crypto, and technology forecasts based on 2.4M active forecasts and 31M forecast updates.",
  trendData: series(11, 60, 62, 0.22, 3.4),
};

export const PLATFORM_STATS = {
  activeForecasts: "2.4M",
  activeForecasters: "100,000",
  forecastUpdates: "31M",
  resolvedOutcomes: "18,400",
  avgCrowdAccuracy: "72.8%",
  trendsConfirmed: "63%",
};

export const indexes: IndexItem[] = [
  {
    id: "ai-confidence",
    name: "AI Confidence Index",
    category: "AI",
    score: 86,
    weeklyChange: 8,
    monthlyChange: 14,
    forecastVolume: 134000,
    crowdAccuracy: 78,
    trendsValidation: "Strong",
    reliabilityGrade: "A-",
    description:
      "Measures global confidence in AI adoption, AI company valuations, job automation, AI agents, model capability, and enterprise AI spending.",
    trendData: series(2, 60, 70, 0.3, 2.6),
    summary:
      "The AI Confidence Index rose this week as crowd probabilities increased around enterprise AI adoption, AI agents, infrastructure spending, and job automation. Search-interest data also shows rising attention around AI agents, enterprise AI, and AI layoffs, supporting the direction of the signal.",
    drivers: [
      { text: "Enterprise AI spending increases significantly in 2027", prob: 72 },
      { text: "AI agents become common in enterprise workflows", prob: 68 },
      { text: "AI reduces customer service headcount by 2030", prob: 61 },
      { text: "A major AI company reaches $1T valuation before 2030", prob: 58 },
    ],
  },
  {
    id: "crypto-confidence",
    name: "Crypto Confidence Index",
    category: "Crypto",
    score: 78,
    weeklyChange: 6,
    monthlyChange: 11,
    forecastVolume: 248000,
    crowdAccuracy: 61,
    trendsValidation: "Moderate",
    reliabilityGrade: "B-",
    description:
      "Measures confidence in Bitcoin, Ethereum, stablecoins, ETF flows, regulation, crypto adoption, and institutional demand.",
    trendData: series(5, 60, 64, 0.28, 5.2),
    summary:
      "The Crypto Confidence Index climbed on renewed ETF inflows and institutional demand narratives. However, this category historically shows elevated overconfidence on extreme price targets, and search-interest only moderately confirms the move.",
    drivers: [
      { text: "Bitcoin exceeds $200,000 before January 2028", prob: 67 },
      { text: "A major country adds Bitcoin to national reserves by 2030", prob: 41 },
      { text: "A stablecoin becomes widely used for payments by 2030", prob: 58 },
      { text: "Ethereum reaches $15,000 before 2030", prob: 52 },
    ],
  },
  {
    id: "housing-confidence",
    name: "Housing Confidence Index",
    category: "Housing",
    score: 61,
    weeklyChange: -2,
    monthlyChange: 1,
    forecastVolume: 89000,
    crowdAccuracy: 74,
    trendsValidation: "Strong",
    reliabilityGrade: "A",
    description:
      "Measures expectations around home prices, mortgage rates, inventory, buyer demand, affordability, and regional real estate trends.",
    trendData: series(7, 60, 63, -0.04, 1.9),
    summary:
      "Housing confidence softened slightly as mortgage-rate-relief probabilities fell. The category remains one of the most reliable on the platform, with strong search-interest confirmation across affordability and inventory queries.",
    drivers: [
      { text: "Austin home prices rise more than 15% by 2028", prob: 64 },
      { text: "Mortgage rates fall below 4% before 2027", prob: 32 },
      { text: "US home inventory normalizes before 2028", prob: 47 },
      { text: "Home insurance becomes harder to obtain in high-risk states by 2030", prob: 71 },
    ],
  },
  {
    id: "startup-confidence",
    name: "Startup Confidence Index",
    category: "Startups",
    score: 54,
    weeklyChange: -3,
    monthlyChange: -6,
    forecastVolume: 42000,
    crowdAccuracy: 69,
    trendsValidation: "Moderate",
    reliabilityGrade: "B+",
    description:
      "Measures confidence around venture funding, IPO markets, startup hiring, AI startups, founder sentiment, and exit activity.",
    trendData: series(13, 60, 60, -0.12, 2.8),
    summary:
      "Startup confidence eased as IPO timing expectations slipped. Founder sentiment remains cautious, though AI-native startups continue to attract disproportionate forecast attention.",
    drivers: [
      { text: "A major AI startup IPOs before 2028", prob: 49 },
      { text: "Venture funding rebounds meaningfully before 2028", prob: 53 },
      { text: "Private forecasting becomes a standard enterprise tool by 2030", prob: 44 },
      { text: "A new social platform reaches 500M users before 2030", prob: 38 },
    ],
  },
  {
    id: "economy-confidence",
    name: "Economy Confidence Index",
    category: "Economy",
    score: 58,
    weeklyChange: -4,
    monthlyChange: -7,
    forecastVolume: 120000,
    crowdAccuracy: 71,
    trendsValidation: "Strong",
    reliabilityGrade: "A-",
    description:
      "Measures confidence in GDP growth, inflation, interest rates, employment, wages, consumer spending, and recession risk.",
    trendData: series(17, 60, 64, -0.16, 2.2),
    summary:
      "Economic confidence declined as recession-risk and inflation probabilities ticked higher. Strong search-interest validation supports the crowd's growing caution on rates and employment.",
    drivers: [
      { text: "The US enters a recession before the end of 2027", prob: 43 },
      { text: "Inflation returns above 5% before 2028", prob: 36 },
      { text: "The average US new car price declines before 2028", prob: 41 },
      { text: "Remote work increases again by 2028", prob: 48 },
    ],
  },
  {
    id: "consumer-confidence",
    name: "Consumer Confidence Index",
    category: "Consumer",
    score: 66,
    weeklyChange: 1,
    monthlyChange: 3,
    forecastVolume: 31000,
    crowdAccuracy: 67,
    trendsValidation: "Moderate",
    reliabilityGrade: "B",
    description:
      "Measures expectations around spending, savings, debt, wages, retail demand, and consumer behavior.",
    trendData: series(19, 60, 64, 0.05, 2.1),
    summary:
      "Consumer confidence held steady with a slight upward bias. Spending-direction forecasts remain resilient even as debt and savings concerns persist.",
    drivers: [
      { text: "US EV sales exceed 40% of new car sales before 2030", prob: 39 },
      { text: "Personal AI assistants become standard on smartphones before 2028", prob: 72 },
      { text: "Commercial drone delivery becomes common in major cities by 2030", prob: 46 },
      { text: "AI-generated video becomes mainstream in advertising by 2027", prob: 64 },
    ],
  },
  {
    id: "energy-confidence",
    name: "Energy Confidence Index",
    category: "Energy",
    score: 63,
    weeklyChange: 3,
    monthlyChange: 5,
    forecastVolume: 27000,
    crowdAccuracy: 70,
    trendsValidation: "Moderate",
    reliabilityGrade: "B+",
    description:
      "Measures expectations around oil, renewables, grid demand, nuclear power, energy prices, and electrification.",
    trendData: series(23, 60, 60, 0.12, 2.4),
    summary:
      "Energy confidence rose on accelerating nuclear-investment and electrification narratives. Grid-demand forecasts increasingly factor in AI data-center load growth.",
    drivers: [
      { text: "Nuclear energy investment doubles by 2030", prob: 57 },
      { text: "A major automaker goes fully electric by 2035", prob: 62 },
      { text: "A major city bans most gas-powered vehicles downtown by 2035", prob: 44 },
      { text: "The global AI chip market doubles before 2030", prob: 74 },
    ],
  },
  {
    id: "geopolitical-risk",
    name: "Geopolitical Risk Index",
    category: "Geopolitics",
    score: 47,
    weeklyChange: -5,
    monthlyChange: 4,
    forecastVolume: 74000,
    crowdAccuracy: 55,
    trendsValidation: "Weak",
    reliabilityGrade: "C+",
    description:
      "Measures perceived risk around elections, international conflict, trade, sanctions, regional instability, and policy shocks.",
    trendData: series(29, 60, 50, -0.1, 5.6),
    summary:
      "Perceived geopolitical risk moved sharply this week. This category carries the platform's weakest reliability — crowd accuracy is lower and search-interest rarely confirms shock-driven moves in advance.",
    drivers: [
      { text: "A major cyberattack disrupts a Fortune 500 company before 2027", prob: 59 },
      { text: "A major country introduces a CBDC before 2030", prob: 51 },
      { text: "Climate insurance premiums rise more than 25% by 2030", prob: 66 },
      { text: "A major streaming platform merges with another media company before 2030", prob: 48 },
    ],
  },
];

const reliabilityByCat: Record<Category, Forecast["reliabilityLabel"]> = {
  AI: "Reliable Signal",
  Housing: "Reliable Signal",
  Economy: "Reliable Signal",
  Startups: "Mixed Signal",
  Energy: "Mixed Signal",
  Crypto: "Overheated Signal",
  Geopolitics: "Weak Signal",
  Technology: "Mixed Signal",
  Consumer: "Mixed Signal",
  Healthcare: "Mixed Signal",
};

interface ForecastSeed {
  q: string;
  cat: Category;
  prob: number;
  t7: number;
  t24: number;
  count: number;
  date: string;
  validation: Forecast["trendsValidation"];
  hype: Forecast["hypeRisk"];
  momentum: number;
  reliability?: Forecast["reliabilityLabel"];
}

const seeds: ForecastSeed[] = [
  { q: "Will Bitcoin exceed $200,000 before January 2028?", cat: "Crypto", prob: 67, t7: 7, t24: 1.2, count: 31240, date: "Jan 1, 2028", validation: "Moderate", hype: "Medium", momentum: 28, reliability: "Mixed Signal" },
  { q: "Will OpenAI reach a $1 trillion valuation before 2030?", cat: "AI", prob: 58, t7: 4, t24: 0.6, count: 28100, date: "Dec 31, 2029", validation: "Strong", hype: "Medium", momentum: 33 },
  { q: "Will mortgage rates fall below 4% before 2027?", cat: "Housing", prob: 32, t7: -6, t24: -0.8, count: 19800, date: "Jan 1, 2027", validation: "Moderate", hype: "Low", momentum: 21 },
  { q: "Will Austin home prices rise more than 15% by 2028?", cat: "Housing", prob: 64, t7: -2, t24: 0.2, count: 9100, date: "Jan 1, 2028", validation: "Strong", hype: "Low", momentum: 12, reliability: "Reliable Signal" },
  { q: "Will AI replace more than 20% of customer service jobs by 2030?", cat: "AI", prob: 61, t7: 5, t24: 0.9, count: 37400, date: "Dec 31, 2030", validation: "Strong", hype: "Medium", momentum: 44, reliability: "Reliable Signal" },
  { q: "Will a major country adopt Bitcoin as part of national reserves by 2030?", cat: "Crypto", prob: 41, t7: 3, t24: 0.4, count: 22300, date: "Dec 31, 2030", validation: "Weak", hype: "High", momentum: 18, reliability: "Overheated Signal" },
  { q: "Will the US enter a recession before the end of 2027?", cat: "Economy", prob: 43, t7: 6, t24: 1.1, count: 51200, date: "Dec 31, 2027", validation: "Strong", hype: "Medium", momentum: 37 },
  { q: "Will humanoid robots be common in warehouses by 2030?", cat: "Technology", prob: 55, t7: 4, t24: 0.7, count: 17600, date: "Dec 31, 2030", validation: "Moderate", hype: "Medium", momentum: 41 },
  { q: "Will nuclear energy investment double by 2030?", cat: "Energy", prob: 57, t7: 5, t24: 0.8, count: 12900, date: "Dec 31, 2030", validation: "Moderate", hype: "Low", momentum: 29 },
  { q: "Will a major AI startup IPO before 2028?", cat: "Startups", prob: 49, t7: -5, t24: -0.6, count: 14600, date: "Dec 31, 2027", validation: "Weak", hype: "Medium", momentum: 9, reliability: "Mixed Signal" },
  { q: "Will autonomous taxis operate in more than 20 US cities by 2030?", cat: "Technology", prob: 62, t7: 3, t24: 0.5, count: 21400, date: "Dec 31, 2030", validation: "Strong", hype: "Low", momentum: 31 },
  { q: "Will inflation return above 5% before 2028?", cat: "Economy", prob: 36, t7: 2, t24: 0.3, count: 33800, date: "Dec 31, 2027", validation: "Strong", hype: "Low", momentum: 16 },
  { q: "Will Ethereum reach $15,000 before 2030?", cat: "Crypto", prob: 52, t7: 4, t24: 0.7, count: 26700, date: "Dec 31, 2029", validation: "Weak", hype: "High", momentum: -8, reliability: "Overheated Signal" },
  { q: "Will remote work increase again by 2028?", cat: "Economy", prob: 48, t7: 1, t24: 0.1, count: 11200, date: "Dec 31, 2027", validation: "Moderate", hype: "Low", momentum: 7 },
  { q: "Will AI-generated video become mainstream in advertising by 2027?", cat: "AI", prob: 64, t7: 8, t24: 1.4, count: 24100, date: "Dec 31, 2026", validation: "Strong", hype: "Medium", momentum: 52, reliability: "Reliable Signal" },
  { q: "Will a major automaker go fully electric by 2035?", cat: "Energy", prob: 62, t7: 2, t24: 0.3, count: 9800, date: "Dec 31, 2034", validation: "Moderate", hype: "Low", momentum: 14 },
  { q: "Will US home inventory normalize before 2028?", cat: "Housing", prob: 47, t7: -1, t24: -0.2, count: 8700, date: "Jan 1, 2028", validation: "Strong", hype: "Low", momentum: 11, reliability: "Reliable Signal" },
  { q: "Will space tourism exceed 10,000 annual passengers by 2035?", cat: "Technology", prob: 34, t7: -2, t24: -0.3, count: 6400, date: "Dec 31, 2035", validation: "Weak", hype: "Medium", momentum: 5 },
  { q: "Will a major cyberattack disrupt a Fortune 500 company before 2027?", cat: "Geopolitics", prob: 59, t7: 4, t24: 0.6, count: 18200, date: "Dec 31, 2026", validation: "Weak", hype: "Medium", momentum: 23, reliability: "Weak Signal" },
  { q: "Will AI agents handle more than 30% of enterprise support tickets by 2030?", cat: "AI", prob: 71, t7: 9, t24: 1.6, count: 44900, date: "Dec 31, 2030", validation: "Strong", hype: "Low", momentum: 39, reliability: "Reliable Signal" },
  { q: "Will venture funding rebound meaningfully before 2028?", cat: "Startups", prob: 53, t7: -3, t24: -0.4, count: 13100, date: "Dec 31, 2027", validation: "Moderate", hype: "Medium", momentum: 12 },
  { q: "Will Apple release consumer AR glasses before 2030?", cat: "Technology", prob: 56, t7: 3, t24: 0.5, count: 29400, date: "Dec 31, 2029", validation: "Moderate", hype: "Medium", momentum: 27 },
  { q: "Will a major stablecoin become widely used for payments by 2030?", cat: "Crypto", prob: 58, t7: 5, t24: 0.8, count: 16800, date: "Dec 31, 2030", validation: "Moderate", hype: "Medium", momentum: 25 },
  { q: "Will climate insurance premiums rise more than 25% by 2030?", cat: "Geopolitics", prob: 66, t7: 3, t24: 0.4, count: 8900, date: "Dec 31, 2030", validation: "Strong", hype: "Low", momentum: 19 },
  { q: "Will a new AI model beat top humans on broad scientific reasoning by 2030?", cat: "AI", prob: 53, t7: 6, t24: 1.0, count: 31900, date: "Dec 31, 2030", validation: "Strong", hype: "Medium", momentum: 48 },
  { q: "Will the average US new car price decline before 2028?", cat: "Consumer", prob: 41, t7: 1, t24: 0.2, count: 7600, date: "Dec 31, 2027", validation: "Moderate", hype: "Low", momentum: 8 },
  { q: "Will commercial drone delivery become common in major cities by 2030?", cat: "Consumer", prob: 46, t7: 2, t24: 0.3, count: 9200, date: "Dec 31, 2030", validation: "Moderate", hype: "Medium", momentum: 17 },
  { q: "Will a major city ban most gas-powered vehicles from downtown by 2035?", cat: "Energy", prob: 44, t7: 1, t24: 0.1, count: 6700, date: "Dec 31, 2035", validation: "Weak", hype: "Low", momentum: 6 },
  { q: "Will AI meaningfully reduce software development hiring by 2030?", cat: "AI", prob: 57, t7: 7, t24: 1.2, count: 38600, date: "Dec 31, 2030", validation: "Strong", hype: "Medium", momentum: 46 },
  { q: "Will private forecasting become a standard enterprise planning tool by 2030?", cat: "Startups", prob: 44, t7: 2, t24: 0.3, count: 5200, date: "Dec 31, 2030", validation: "Moderate", hype: "Low", momentum: 22 },
  { q: "Will a major streaming platform merge with another media company before 2030?", cat: "Technology", prob: 48, t7: -1, t24: -0.1, count: 7100, date: "Dec 31, 2029", validation: "Weak", hype: "Medium", momentum: 4 },
  { q: "Will home insurance become materially harder to obtain in high-risk US states by 2030?", cat: "Housing", prob: 71, t7: 3, t24: 0.4, count: 10300, date: "Dec 31, 2030", validation: "Strong", hype: "Low", momentum: 24, reliability: "Reliable Signal" },
  { q: "Will a major country introduce a central bank digital currency before 2030?", cat: "Geopolitics", prob: 51, t7: 2, t24: 0.3, count: 12600, date: "Dec 31, 2029", validation: "Weak", hype: "Medium", momentum: 13 },
  { q: "Will AI tutors become common in K-12 education before 2030?", cat: "AI", prob: 49, t7: 4, t24: 0.6, count: 14200, date: "Dec 31, 2029", validation: "Moderate", hype: "Medium", momentum: 30 },
  { q: "Will US EV sales exceed 40% of new car sales before 2030?", cat: "Energy", prob: 39, t7: -2, t24: -0.3, count: 18900, date: "Dec 31, 2029", validation: "Moderate", hype: "Low", momentum: 9 },
  { q: "Will a major healthcare system deploy AI agents for patient intake before 2030?", cat: "Healthcare", prob: 55, t7: 4, t24: 0.7, count: 8400, date: "Dec 31, 2029", validation: "Moderate", hype: "Low", momentum: 26 },
  { q: "Will a Fortune 100 company replace a major department workflow with AI agents before 2028?", cat: "AI", prob: 63, t7: 6, t24: 1.0, count: 21700, date: "Dec 31, 2027", validation: "Strong", hype: "Low", momentum: 35, reliability: "Reliable Signal" },
  { q: "Will personal AI assistants become standard on smartphones before 2028?", cat: "Consumer", prob: 72, t7: 5, t24: 0.8, count: 26300, date: "Dec 31, 2027", validation: "Strong", hype: "Low", momentum: 41, reliability: "Reliable Signal" },
  { q: "Will a new social media platform reach 500M users before 2030?", cat: "Consumer", prob: 38, t7: -1, t24: -0.2, count: 11400, date: "Dec 31, 2029", validation: "Weak", hype: "Medium", momentum: 3 },
  { q: "Will the global AI chip market double before 2030?", cat: "Technology", prob: 74, t7: 6, t24: 1.0, count: 33200, date: "Dec 31, 2029", validation: "Strong", hype: "Low", momentum: 43, reliability: "Reliable Signal" },
  { q: "Will a major US health insurer use AI for most claims decisions by 2030?", cat: "Healthcare", prob: 52, t7: 3, t24: 0.5, count: 6800, date: "Dec 31, 2029", validation: "Moderate", hype: "Medium", momentum: 20 },
];

function slugify(q: string): string {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export const forecasts: Forecast[] = seeds.map((s, i) => {
  const reliability = s.reliability ?? reliabilityByCat[s.cat];
  const trendBase = s.prob - s.t7;
  return {
    id: slugify(s.q),
    question: s.q,
    category: s.cat,
    probability: s.prob,
    confidenceScore: 55 + ((i * 7) % 40),
    forecastCount: s.count,
    uniqueForecasters: Math.round(s.count * 0.42),
    trend24h: s.t24,
    trend7d: s.t7,
    resolutionDate: s.date,
    resolutionCriteria:
      "Resolves YES if the stated condition is verifiably met by the resolution date according to the listed source of truth; otherwise resolves NO.",
    sourceOfTruth:
      s.cat === "Economy"
        ? "BLS, BEA, and Federal Reserve releases"
        : s.cat === "Crypto"
          ? "Major exchange spot prices (volume-weighted)"
          : s.cat === "Housing"
            ? "Freddie Mac, Case-Shiller, and Realtor.com data"
            : "Credible public filings, regulatory data, and major news reporting",
    status: s.t7 < -4 ? "Closing Soon" : "Open",
    reliabilityLabel: reliability,
    trendsValidation: s.validation,
    hypeRisk: s.hype,
    searchMomentum: s.momentum,
    trendData: series(100 + i, 60, trendBase, s.t7 / 60, 2.4),
    searchData: series(200 + i, 60, 50, s.momentum / 60, 4),
    briefing: buildBriefing(s),
    bullCase: buildBull(s.cat),
    bearCase: buildBear(s.cat),
    catalysts: buildCatalysts(s.cat),
    expertProb: Math.max(2, Math.min(98, s.prob + ((i % 5) - 2) * 6)),
  };
});

function buildBriefing(s: ForecastSeed): string {
  const dir = s.t7 >= 0 ? "increased" : "declined";
  return `Crowd probability ${dir} ${Math.abs(s.t7)} points this week, driven by shifting expectations in the ${s.cat} category. Search-interest momentum is currently ${s.momentum >= 0 ? "+" : ""}${s.momentum}%, providing ${s.validation.toLowerCase()} confirmation of the move. ${
    s.hype === "High"
      ? "Hype risk is elevated — attention is rising faster than the underlying forecast quality."
      : s.cat === "Crypto"
        ? "Note that the Crypto category has historically shown higher overconfidence on extreme targets."
        : "Category accuracy and forecast volume support the current signal quality."
  }`;
}

function buildBull(cat: Category): string[] {
  const map: Partial<Record<Category, string[]>> = {
    Crypto: [
      "Institutional adoption accelerates",
      "ETF demand increases",
      "Supply remains constrained",
      "Macro uncertainty strengthens hard-asset narratives",
      "Younger investors continue allocating to crypto",
    ],
    AI: [
      "Enterprise AI budgets expand faster than expected",
      "Agent reliability crosses production thresholds",
      "Infrastructure spending compounds",
      "Talent and tooling mature rapidly",
      "Measurable ROI accelerates adoption",
    ],
  };
  return (
    map[cat] ?? [
      "Underlying fundamentals continue improving",
      "Public attention and adoption are rising",
      "Leading indicators confirm the direction",
      "Structural tailwinds remain in place",
      "Top forecasters lean toward the YES case",
    ]
  );
}

function buildBear(cat: Category): string[] {
  const map: Partial<Record<Category, string[]>> = {
    Crypto: [
      "Regulatory pressure increases",
      "Market liquidity tightens",
      "Risk assets decline broadly",
      "Competing assets capture attention",
      "Extreme targets attract crowd overconfidence",
    ],
    AI: [
      "Adoption lags hype cycles",
      "Reliability and safety concerns slow deployment",
      "Cost structures pressure margins",
      "Regulation constrains use cases",
      "Macro headwinds cut budgets",
    ],
  };
  return (
    map[cat] ?? [
      "Macro conditions deteriorate",
      "Resolution criteria prove harder to meet",
      "Public attention fades before resolution",
      "Counter-trend signals emerge",
      "Crowd may be overestimating the timeline",
    ]
  );
}

function buildCatalysts(cat: Category): string[] {
  const map: Partial<Record<Category, string[]>> = {
    AI: ["Next-gen model releases", "Enterprise earnings commentary", "Regulatory frameworks", "Major partnership announcements"],
    Crypto: ["ETF flow data", "Regulatory clarity", "Macro liquidity shifts", "On-chain activity trends"],
    Housing: ["Fed rate decisions", "Inventory reports", "Affordability indices", "Regional migration data"],
    Economy: ["CPI & jobs reports", "Fed guidance", "Consumer spending data", "Yield curve movements"],
  };
  return map[cat] ?? ["Quarterly data releases", "Policy decisions", "Major sector news", "Sentiment shifts"];
}

export const categoryAccuracy: CategoryAccuracy[] = [
  { category: "AI", accuracy: 78, overconfidence: 14, underreaction: 19, validation: "Strong", grade: "A-" },
  { category: "Housing", accuracy: 74, overconfidence: 12, underreaction: 21, validation: "Strong", grade: "A" },
  { category: "Economy", accuracy: 71, overconfidence: 17, underreaction: 23, validation: "Strong", grade: "A-" },
  { category: "Startups", accuracy: 69, overconfidence: 21, underreaction: 26, validation: "Moderate", grade: "B+" },
  { category: "Energy", accuracy: 70, overconfidence: 18, underreaction: 24, validation: "Moderate", grade: "B+" },
  { category: "Crypto", accuracy: 61, overconfidence: 33, underreaction: 28, validation: "Moderate", grade: "B-" },
  { category: "Geopolitics", accuracy: 55, overconfidence: 37, underreaction: 31, validation: "Weak", grade: "C+" },
];

export const leaderboard: ForecasterProfile[] = [
  {
    id: "maya-chen",
    name: "Maya Chen",
    avatar: "MC",
    bio: "AI researcher & calibration nerd. Forecasting the future of enterprise intelligence.",
    userType: "Analyst",
    accuracyScore: 91.4,
    calibrationScore: 88.2,
    crowdBeaterRate: 63,
    forecastCount: 2140,
    resolvedCount: 1240,
    followers: 18400,
    following: 312,
    topCategories: [
      { category: "AI", score: 92 },
      { category: "Economy", score: 86 },
      { category: "Startups", score: 84 },
    ],
    badges: ["Top 1% AI Forecaster", "Crowd Beater", "Early Signal Finder", "High-Conviction Winner", "Founding Forecaster"],
  },
  {
    id: "daniel-brooks",
    name: "Daniel Brooks",
    avatar: "DB",
    bio: "Macro strategist. Rates, recessions, and reflexivity.",
    userType: "Investor",
    accuracyScore: 89.7,
    calibrationScore: 86.1,
    crowdBeaterRate: 59,
    forecastCount: 1890,
    resolvedCount: 1102,
    followers: 12300,
    following: 188,
    topCategories: [
      { category: "Economy", score: 90 },
      { category: "Energy", score: 81 },
      { category: "Geopolitics", score: 74 },
    ],
    badges: ["Macro Master", "Crowd Beater", "Calibrated Mind"],
  },
  {
    id: "sofia-rivera",
    name: "Sofia Rivera",
    avatar: "SR",
    bio: "Real estate economist tracking regional housing cycles.",
    userType: "Researcher",
    accuracyScore: 87.9,
    calibrationScore: 85.4,
    crowdBeaterRate: 56,
    forecastCount: 1610,
    resolvedCount: 940,
    followers: 9800,
    following: 240,
    topCategories: [
      { category: "Housing", score: 89 },
      { category: "Consumer", score: 79 },
      { category: "Economy", score: 76 },
    ],
    badges: ["Housing Oracle", "Crowd Beater", "Steady Hand"],
  },
  {
    id: "ethan-park",
    name: "Ethan Park",
    avatar: "EP",
    bio: "On-chain analyst. Separating crypto signal from hype.",
    userType: "Trader",
    accuracyScore: 86.5,
    calibrationScore: 82.0,
    crowdBeaterRate: 54,
    forecastCount: 2320,
    resolvedCount: 1410,
    followers: 14100,
    following: 401,
    topCategories: [
      { category: "Crypto", score: 84 },
      { category: "Technology", score: 77 },
      { category: "Startups", score: 71 },
    ],
    badges: ["Contrarian", "Crowd Beater", "Hype Detector"],
  },
  {
    id: "amara-singh",
    name: "Amara Singh",
    avatar: "AS",
    bio: "Venture scout forecasting startup outcomes and exits.",
    userType: "Founder",
    accuracyScore: 85.8,
    calibrationScore: 83.3,
    crowdBeaterRate: 52,
    forecastCount: 1450,
    resolvedCount: 870,
    followers: 8600,
    following: 290,
    topCategories: [
      { category: "Startups", score: 86 },
      { category: "AI", score: 80 },
      { category: "Technology", score: 75 },
    ],
    badges: ["Startup Whisperer", "Crowd Beater", "Early Signal Finder"],
  },
  {
    id: "noah-kim",
    name: "Noah Kim",
    avatar: "NK",
    bio: "Energy & climate forecaster.",
    userType: "Analyst",
    accuracyScore: 84.2,
    calibrationScore: 80.9,
    crowdBeaterRate: 51,
    forecastCount: 1280,
    resolvedCount: 760,
    followers: 6400,
    following: 150,
    topCategories: [
      { category: "Energy", score: 83 },
      { category: "Economy", score: 74 },
      { category: "Geopolitics", score: 68 },
    ],
    badges: ["Energy Edge", "Calibrated Mind"],
  },
  {
    id: "lena-fischer",
    name: "Lena Fischer",
    avatar: "LF",
    bio: "Journalist covering tech & AI policy.",
    userType: "Journalist",
    accuracyScore: 83.1,
    calibrationScore: 79.5,
    crowdBeaterRate: 49,
    forecastCount: 990,
    resolvedCount: 540,
    followers: 5200,
    following: 320,
    topCategories: [
      { category: "Technology", score: 82 },
      { category: "AI", score: 78 },
      { category: "Consumer", score: 70 },
    ],
    badges: ["Signal Scout", "New Voice"],
  },
  {
    id: "marcus-webb",
    name: "Marcus Webb",
    avatar: "MW",
    bio: "Corporate strategist forecasting enterprise adoption.",
    userType: "Corporate strategist",
    accuracyScore: 82.4,
    calibrationScore: 78.8,
    crowdBeaterRate: 48,
    forecastCount: 1120,
    resolvedCount: 610,
    followers: 4900,
    following: 210,
    topCategories: [
      { category: "AI", score: 81 },
      { category: "Startups", score: 73 },
      { category: "Consumer", score: 69 },
    ],
    badges: ["Enterprise Eye", "Crowd Beater"],
  },
];

export const currentUser: ForecasterProfile = {
  id: "you",
  name: "You",
  avatar: "YOU",
  bio: "Building a forecasting track record on SignalCrowd.",
  userType: "Founder",
  accuracyScore: 84.2,
  calibrationScore: 81.6,
  crowdBeaterRate: 58,
  forecastCount: 312,
  resolvedCount: 184,
  followers: 1240,
  following: 96,
  topCategories: [
    { category: "AI", score: 87 },
    { category: "Crypto", score: 79 },
    { category: "Economy", score: 76 },
  ],
  badges: ["Crowd Beater", "Early Signal Finder", "Founding Forecaster"],
};

export const reports: Report[] = [
  {
    id: "weekly-ai",
    title: "Weekly AI Signal Report",
    category: "AI",
    price: 49,
    summary: "Deep analysis of the AI Confidence Index, top movers, and enterprise adoption signals.",
    includes: [
      "AI Confidence Index analysis",
      "AI forecast movers",
      "Trends validation",
      "Crowd reliability",
      "Expert vs crowd comparison",
      "Enterprise AI adoption signals",
      "Job automation probability trends",
    ],
    pages: 24,
    updated: "Updated weekly",
  },
  {
    id: "crypto-signal",
    title: "Crypto Signal Report",
    category: "Crypto",
    price: 49,
    summary: "Bitcoin and Ethereum probability trends with hype-risk and overconfidence warnings.",
    includes: [
      "Bitcoin probability trends",
      "Ethereum probability trends",
      "Hype risk analysis",
      "Search-interest validation",
      "Crowd overconfidence warnings",
      "Institutional adoption forecasts",
    ],
    pages: 22,
    updated: "Updated weekly",
  },
  {
    id: "housing-signal",
    title: "Housing Signal Report",
    category: "Housing",
    price: 49,
    summary: "Mortgage rate expectations, regional confidence, and home price forecast reliability.",
    includes: [
      "Mortgage rate expectations",
      "Regional housing confidence",
      "Buyer demand signals",
      "Search-interest validation",
      "Home price forecast reliability",
      "Inventory expectations",
    ],
    pages: 20,
    updated: "Updated weekly",
  },
  {
    id: "macro-risk",
    title: "Macro Risk Report",
    category: "Macro",
    price: 99,
    summary: "Recession, inflation, and rate outlook with consumer-spending signals.",
    includes: [
      "Recession probability",
      "Inflation expectations",
      "Interest rate outlook",
      "Employment confidence",
      "Consumer spending signals",
      "Search-interest validation",
    ],
    pages: 38,
    updated: "Updated weekly",
  },
];

export const todaysMoves = [
  { text: "AI Confidence Index rose 8 points.", change: 8, positive: true },
  { text: "Bitcoin $200K probability increased from 60% to 67%.", change: 7, positive: true },
  { text: "Mortgage-rate-drop probability fell from 38% to 32%.", change: -6, positive: false },
  { text: "Startup IPO confidence declined 5 points.", change: -5, positive: false },
  { text: "Geopolitical Risk Index rose 4 points.", change: 4, positive: true },
];

export const briefingItems = [
  "AI Confidence Index rose 8 points.",
  "Bitcoin $200K forecast increased from 60% to 67%.",
  "Mortgage-rate-drop probability fell from 38% to 32%.",
  "Startup IPO confidence dropped 5 points.",
  "AI agents forecast is now a Reliable Signal.",
  "Ethereum $15K forecast shows rising probability but weak search-interest confirmation.",
  "Crypto category currently has elevated overconfidence risk.",
];

export function getForecast(id: string): Forecast | undefined {
  return forecasts.find((f) => f.id === id);
}

export function getIndex(id: string): IndexItem | undefined {
  return indexes.find((i) => i.id === id);
}

export function getForecaster(id: string): ForecasterProfile | undefined {
  if (id === "you") return currentUser;
  return leaderboard.find((p) => p.id === id);
}
