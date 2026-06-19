import type {
  IndexItem,
  Forecast,
  ForecasterProfile,
  Report,
  CategoryAccuracy,
  Category,
  ProductOpportunity,
  ProductCategory,
  CommerceIndex,
  CommerceIndexCategory,
  LifecycleStage,
  ProductRecommendation,
  GapLabel,
  MarginLabel,
  TikTokMomentum,
  AmazonSaturation,
  ValidationStrength,
  TrendReliability,
  CreatorFitLabel,
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

// ── Legacy types kept for backwards compat ──

export const CATEGORIES: Category[] = [
  "AI", "Crypto", "Housing", "Economy", "Startups", "Energy", "Geopolitics", "Technology", "Consumer", "Healthcare",
];

export const GLOBAL_SIGNAL = {
  score: 78,
  weeklyChange: 6.4,
  subtitle:
    "Product opportunity is rising across beauty, home gadgets, pet products, and creator-led wellness categories.",
  trendData: series(11, 60, 62, 0.22, 3.4),
};

export const PLATFORM_STATS = {
  productsTracked: "125,000",
  trendingProducts: "4,820",
  tiktokToAmazonGaps: "342",
  highHypeRisk: "918",
  strongMarginOpps: "186",
  creatorLedTrends: "1,240",
  searchValidated: "63%",
};

// ── COMMERCE PRODUCT DATA ──

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Beauty", "Haircare", "Skincare", "Home Gadgets", "Kitchen Gadgets",
  "Pet Products", "Baby/Kids", "Fitness Accessories", "Fashion Accessories",
  "Wellness", "Cleaning Products", "Travel Accessories", "Tech Accessories", "Home Office", "Gadgets",
];

interface ProductSeed {
  name: string;
  cat: ProductCategory;
  score: number;
  rec: ProductRecommendation;
  tiktok: TikTokMomentum;
  amazon: AmazonSaturation;
  gap: GapLabel;
  validation: ValidationStrength;
  creatorM: "High" | "Medium" | "Low";
  satScore: number;
  hypeScore: number;
  margin: MarginLabel;
  lifecycle: LifecycleStage;
  sentiment: "Positive" | "Mixed" | "Negative";
  reliability: TrendReliability;
  price: string;
  competition: "Low" | "Medium" | "High" | "Extreme";
  creatorFit: CreatorFitLabel;
  velocity: string;
  estMargin: string;
  desc: string;
}

const productSeeds: ProductSeed[] = [
  {
    name: "Heatless Curling Kit", cat: "Beauty", score: 84, rec: "Test Now", tiktok: "Strong", amazon: "Medium",
    gap: "Strong Gap Opportunity", validation: "Strong", creatorM: "High", satScore: 52, hypeScore: 38,
    margin: "Good", lifecycle: "Breakout", sentiment: "Positive", reliability: "Reliable Trend",
    price: "$12–28", competition: "Medium", creatorFit: "Strong", velocity: "8,200/wk", estMargin: "55–68%",
    desc: "Heatless hair curling kits using soft foam rollers and satin wraps. Strong creator-led momentum with how-to content driving discovery.",
  },
  {
    name: "Pet Hair Remover Roller", cat: "Pet Products", score: 81, rec: "Test Small", tiktok: "Rising", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Strong", creatorM: "High", satScore: 44, hypeScore: 22,
    margin: "Good", lifecycle: "Accelerating", sentiment: "Positive", reliability: "Reliable Trend",
    price: "$8–19", competition: "Medium", creatorFit: "Strong", velocity: "6,100/wk", estMargin: "50–65%",
    desc: "Lint-roller-style pet hair removers with reusable surfaces. Strong demo content drives conversion.",
  },
  {
    name: "Mini Label Maker", cat: "Home Office", score: 79, rec: "Watch Closely", tiktok: "Rising", amazon: "Low",
    gap: "Strong Gap Opportunity", validation: "Moderate", creatorM: "Medium", satScore: 28, hypeScore: 25,
    margin: "Good", lifecycle: "Emerging", sentiment: "Positive", reliability: "Early Signal",
    price: "$15–35", competition: "Low", creatorFit: "Moderate", velocity: "3,900/wk", estMargin: "45–60%",
    desc: "Compact Bluetooth label makers for home organization. Low Amazon saturation with rising TikTok interest.",
  },
  {
    name: "Under-Eye Patches", cat: "Skincare", score: 76, rec: "Creator Opportunity", tiktok: "High", amazon: "High",
    gap: "Already Saturated", validation: "Strong", creatorM: "High", satScore: 78, hypeScore: 40,
    margin: "Medium", lifecycle: "Mainstream", sentiment: "Mixed", reliability: "Saturated Trend",
    price: "$6–22", competition: "High", creatorFit: "Strong", velocity: "14,500/wk", estMargin: "35–50%",
    desc: "Hydrogel under-eye patches. Heavy competition but strong repeat purchase. Differentiate via branding and ingredients.",
  },
  {
    name: "Travel Jewelry Organizer", cat: "Travel Accessories", score: 74, rec: "Amazon Gap Opportunity", tiktok: "Medium", amazon: "Low",
    gap: "Strong Gap Opportunity", validation: "Moderate", creatorM: "Low", satScore: 22, hypeScore: 15,
    margin: "Good", lifecycle: "Emerging", sentiment: "Positive", reliability: "Early Signal",
    price: "$14–32", competition: "Low", creatorFit: "Moderate", velocity: "2,800/wk", estMargin: "50–65%",
    desc: "Compact jewelry organizers with multiple compartments. Low competition, rising travel-content interest.",
  },
  {
    name: "Portable Blender", cat: "Kitchen Gadgets", score: 48, rec: "Avoid", tiktok: "Medium", amazon: "High",
    gap: "Already Saturated", validation: "Weak", creatorM: "Medium", satScore: 86, hypeScore: 72,
    margin: "Thin", lifecycle: "Saturating", sentiment: "Mixed", reliability: "Short-Lived Spike",
    price: "$18–40", competition: "Extreme", creatorFit: "Moderate", velocity: "11,200/wk", estMargin: "18–28%",
    desc: "USB-rechargeable personal blenders. Extreme saturation with declining margins. High return rates reported.",
  },
  {
    name: "Mini Thermal Printer", cat: "Gadgets", score: 44, rec: "Avoid Overbuying", tiktok: "High", amazon: "High",
    gap: "Already Saturated", validation: "Weak", creatorM: "High", satScore: 82, hypeScore: 84,
    margin: "Thin", lifecycle: "Saturating", sentiment: "Mixed", reliability: "Hype Risk",
    price: "$22–50", competition: "Extreme", creatorFit: "Moderate", velocity: "9,800/wk", estMargin: "15–25%",
    desc: "Pocket-sized thermal printers for journaling and labels. Massive saturation. Prices compressed to near-cost.",
  },
  {
    name: "Silicone Air Fryer Liners", cat: "Kitchen Gadgets", score: 71, rec: "Watch", tiktok: "Medium", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Strong", creatorM: "Medium", satScore: 55, hypeScore: 28,
    margin: "Medium", lifecycle: "Mainstream", sentiment: "Positive", reliability: "Durable Demand",
    price: "$6–14", competition: "Medium", creatorFit: "Moderate", velocity: "5,400/wk", estMargin: "40–55%",
    desc: "Reusable silicone liners for air fryers. Steady demand with new air fryer adoption. Low differentiation needed.",
  },
  {
    name: "Scalp Massager Brush", cat: "Haircare", score: 70, rec: "Differentiate", tiktok: "High", amazon: "High",
    gap: "Already Saturated", validation: "Strong", creatorM: "High", satScore: 75, hypeScore: 45,
    margin: "Medium", lifecycle: "Mainstream", sentiment: "Positive", reliability: "Durable Demand",
    price: "$5–16", competition: "High", creatorFit: "Strong", velocity: "12,000/wk", estMargin: "30–45%",
    desc: "Silicone scalp massagers for shower use. Mainstream product — differentiate with ergonomics, materials, bundles.",
  },
  {
    name: "Ice Roller", cat: "Skincare", score: 73, rec: "Test Small", tiktok: "Rising", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Strong", creatorM: "High", satScore: 48, hypeScore: 30,
    margin: "Good", lifecycle: "Accelerating", sentiment: "Positive", reliability: "Reliable Trend",
    price: "$8–22", competition: "Medium", creatorFit: "Strong", velocity: "5,700/wk", estMargin: "50–65%",
    desc: "Facial ice rollers for skin depuffing. Strong skincare-routine content fit. Good margin potential.",
  },
  {
    name: "Foldable Makeup Bag", cat: "Beauty", score: 68, rec: "Watch", tiktok: "Medium", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Moderate", creatorM: "Medium", satScore: 50, hypeScore: 25,
    margin: "Medium", lifecycle: "Mainstream", sentiment: "Positive", reliability: "Durable Demand",
    price: "$10–28", competition: "Medium", creatorFit: "Strong", velocity: "4,200/wk", estMargin: "40–55%",
    desc: "Foldable travel makeup bags with compartments. Steady demand from beauty and organization content.",
  },
  {
    name: "Pet Paw Cleaner", cat: "Pet Products", score: 72, rec: "Source Small Batch", tiktok: "Rising", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Moderate", creatorM: "Medium", satScore: 42, hypeScore: 20,
    margin: "Good", lifecycle: "Accelerating", sentiment: "Positive", reliability: "Reliable Trend",
    price: "$9–22", competition: "Medium", creatorFit: "Moderate", velocity: "4,000/wk", estMargin: "45–60%",
    desc: "Cup-style pet paw cleaners with silicone bristles. Rising pet-owner content. Good demo potential.",
  },
  {
    name: "Reusable Water Balloons", cat: "Baby/Kids", score: 75, rec: "Test Now", tiktok: "Strong", amazon: "Low",
    gap: "Strong Gap Opportunity", validation: "Strong", creatorM: "High", satScore: 25, hypeScore: 32,
    margin: "Good", lifecycle: "Breakout", sentiment: "Positive", reliability: "Reliable Trend",
    price: "$8–18", competition: "Low", creatorFit: "Strong", velocity: "7,100/wk", estMargin: "55–70%",
    desc: "Magnetic-closure reusable water balloons. Strong summer seasonal content with family-friendly viral potential.",
  },
  {
    name: "Desk Vacuum", cat: "Home Office", score: 66, rec: "Watch", tiktok: "Medium", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Moderate", creatorM: "Medium", satScore: 56, hypeScore: 35,
    margin: "Medium", lifecycle: "Mainstream", sentiment: "Positive", reliability: "Durable Demand",
    price: "$10–25", competition: "Medium", creatorFit: "Moderate", velocity: "3,600/wk", estMargin: "35–50%",
    desc: "Mini USB desk vacuums for crumbs and dust. Steady demand driven by desk-setup and organization content.",
  },
  {
    name: "Kids Drawing Projector", cat: "Baby/Kids", score: 77, rec: "Source Small Batch", tiktok: "Strong", amazon: "Low",
    gap: "Strong Gap Opportunity", validation: "Strong", creatorM: "High", satScore: 20, hypeScore: 28,
    margin: "Good", lifecycle: "Breakout", sentiment: "Positive", reliability: "Early Signal",
    price: "$15–30", competition: "Low", creatorFit: "Strong", velocity: "5,800/wk", estMargin: "50–65%",
    desc: "Kids' drawing projectors that display images onto paper. Strong parent-content fit. Low Amazon competition.",
  },
  {
    name: "Magnetic Cable Organizer", cat: "Tech Accessories", score: 65, rec: "Watch", tiktok: "Medium", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Moderate", creatorM: "Medium", satScore: 52, hypeScore: 22,
    margin: "Medium", lifecycle: "Mainstream", sentiment: "Positive", reliability: "Durable Demand",
    price: "$7–16", competition: "Medium", creatorFit: "Moderate", velocity: "4,800/wk", estMargin: "40–55%",
    desc: "Magnetic cable organizers for desk management. Steady demand. Low risk, but also low breakout potential.",
  },
  {
    name: "Lash Growth Serum", cat: "Beauty", score: 78, rec: "Test Small", tiktok: "Strong", amazon: "Medium",
    gap: "Strong Gap Opportunity", validation: "Strong", creatorM: "High", satScore: 45, hypeScore: 42,
    margin: "Good", lifecycle: "Accelerating", sentiment: "Positive", reliability: "Reliable Trend",
    price: "$12–35", competition: "Medium", creatorFit: "Strong", velocity: "6,900/wk", estMargin: "55–70%",
    desc: "Peptide-based lash serums. Strong before/after content. Note: ingredient claims require compliance review.",
  },
  {
    name: "LED Face Mask", cat: "Skincare", score: 42, rec: "Avoid", tiktok: "High", amazon: "High",
    gap: "Already Saturated", validation: "Weak", creatorM: "High", satScore: 84, hypeScore: 78,
    margin: "Medium", lifecycle: "Saturating", sentiment: "Mixed", reliability: "Hype Risk",
    price: "$40–120", competition: "Extreme", creatorFit: "Strong", velocity: "3,200/wk", estMargin: "30–40%",
    desc: "LED light therapy face masks. Claims risk, regulatory scrutiny, and high return rates. Avoid for new sellers.",
  },
  {
    name: "Viral Waist Trainer", cat: "Fashion Accessories", score: 36, rec: "Avoid", tiktok: "High", amazon: "High",
    gap: "Already Saturated", validation: "Weak", creatorM: "Medium", satScore: 88, hypeScore: 82,
    margin: "Medium", lifecycle: "Declining", sentiment: "Negative", reliability: "Short-Lived Spike",
    price: "$18–45", competition: "Extreme", creatorFit: "Weak", velocity: "4,100/wk", estMargin: "25–35%",
    desc: "Waist-training garments. Claims risk, negative reviews, platform scrutiny. Strongly avoid.",
  },
  {
    name: "Cheap Smartwatch Clone", cat: "Gadgets", score: 28, rec: "Avoid", tiktok: "Low", amazon: "High",
    gap: "Already Saturated", validation: "None", creatorM: "Low", satScore: 92, hypeScore: 68,
    margin: "Negative", lifecycle: "Declining", sentiment: "Negative", reliability: "Short-Lived Spike",
    price: "$15–40", competition: "Extreme", creatorFit: "Weak", velocity: "2,100/wk", estMargin: "5–15%",
    desc: "Knockoff smartwatches. Terrible margins, high return rates, negative reviews, IP risk. Avoid entirely.",
  },
  {
    name: "Car Seat Gap Organizer", cat: "Travel Accessories", score: 69, rec: "Watch", tiktok: "Medium", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Moderate", creatorM: "Low", satScore: 48, hypeScore: 18,
    margin: "Good", lifecycle: "Mainstream", sentiment: "Positive", reliability: "Durable Demand",
    price: "$8–19", competition: "Medium", creatorFit: "Weak", velocity: "3,300/wk", estMargin: "45–55%",
    desc: "Drop-in gap fillers between car seats. Steady practical demand. Low content virality but consistent sales.",
  },
  {
    name: "Mini Projector", cat: "Gadgets", score: 52, rec: "Watch Closely", tiktok: "Medium", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Weak", creatorM: "Medium", satScore: 60, hypeScore: 48,
    margin: "Medium", lifecycle: "Mainstream", sentiment: "Mixed", reliability: "Unvalidated Trend",
    price: "$45–120", competition: "High", creatorFit: "Moderate", velocity: "2,500/wk", estMargin: "25–38%",
    desc: "Portable mini projectors. Quality complaints common at low price points. Higher cost to compete on quality.",
  },
  {
    name: "Electric Makeup Brush Cleaner", cat: "Beauty", score: 67, rec: "Watch", tiktok: "Rising", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Moderate", creatorM: "High", satScore: 40, hypeScore: 30,
    margin: "Good", lifecycle: "Accelerating", sentiment: "Positive", reliability: "Early Signal",
    price: "$12–28", competition: "Medium", creatorFit: "Strong", velocity: "3,800/wk", estMargin: "45–60%",
    desc: "Electric spinning brush cleaners. Excellent demo content potential. Rising interest from beauty creators.",
  },
  {
    name: "Sleep Headphones", cat: "Wellness", score: 72, rec: "Test Small", tiktok: "Rising", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Strong", creatorM: "Medium", satScore: 38, hypeScore: 24,
    margin: "Good", lifecycle: "Accelerating", sentiment: "Positive", reliability: "Reliable Trend",
    price: "$12–30", competition: "Medium", creatorFit: "Moderate", velocity: "4,500/wk", estMargin: "50–65%",
    desc: "Bluetooth sleep headbands with flat speakers. Rising wellness/sleep content. Good nighttime-demo fit.",
  },
  {
    name: "Shower Steamers", cat: "Wellness", score: 74, rec: "Creator Opportunity", tiktok: "High", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Strong", creatorM: "High", satScore: 42, hypeScore: 34,
    margin: "Good", lifecycle: "Breakout", sentiment: "Positive", reliability: "Reliable Trend",
    price: "$8–22", competition: "Medium", creatorFit: "Strong", velocity: "5,300/wk", estMargin: "55–70%",
    desc: "Aromatherapy shower steamers. Strong ASMR/wellness content fit. Excellent repeat purchase dynamics.",
  },
  {
    name: "Collapsible Water Bottle", cat: "Travel Accessories", score: 63, rec: "Watch", tiktok: "Medium", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Moderate", creatorM: "Medium", satScore: 55, hypeScore: 22,
    margin: "Medium", lifecycle: "Mainstream", sentiment: "Positive", reliability: "Durable Demand",
    price: "$8–20", competition: "Medium", creatorFit: "Moderate", velocity: "3,100/wk", estMargin: "35–48%",
    desc: "Collapsible silicone water bottles. Steady eco-conscious demand. Travel and sustainability content fit.",
  },
  {
    name: "Baby Food Feeder", cat: "Baby/Kids", score: 70, rec: "Source Small Batch", tiktok: "Rising", amazon: "Low",
    gap: "Strong Gap Opportunity", validation: "Strong", creatorM: "Medium", satScore: 24, hypeScore: 16,
    margin: "Good", lifecycle: "Emerging", sentiment: "Positive", reliability: "Early Signal",
    price: "$8–16", competition: "Low", creatorFit: "Moderate", velocity: "3,500/wk", estMargin: "50–65%",
    desc: "Silicone baby food feeders for self-feeding. Strong parent-content opportunity. Low competition.",
  },
  {
    name: "Dog Anxiety Toy", cat: "Pet Products", score: 73, rec: "Test Small", tiktok: "Strong", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Strong", creatorM: "High", satScore: 36, hypeScore: 22,
    margin: "Good", lifecycle: "Accelerating", sentiment: "Positive", reliability: "Reliable Trend",
    price: "$10–28", competition: "Medium", creatorFit: "Strong", velocity: "4,700/wk", estMargin: "50–65%",
    desc: "Snuggle/calming toys for anxious dogs. Strong emotional content. High repeat purchase from devoted owners.",
  },
  {
    name: "Vegetable Chopper", cat: "Kitchen Gadgets", score: 68, rec: "Watch", tiktok: "High", amazon: "High",
    gap: "Already Saturated", validation: "Moderate", creatorM: "High", satScore: 70, hypeScore: 38,
    margin: "Medium", lifecycle: "Mainstream", sentiment: "Positive", reliability: "Durable Demand",
    price: "$14–35", competition: "High", creatorFit: "Strong", velocity: "7,800/wk", estMargin: "30–45%",
    desc: "Multi-blade vegetable choppers. Strong demo content but high competition. Differentiate with quality/design.",
  },
  {
    name: "Portable Fabric Shaver", cat: "Cleaning Products", score: 69, rec: "Watch", tiktok: "Rising", amazon: "Medium",
    gap: "Moderate Gap Opportunity", validation: "Moderate", creatorM: "High", satScore: 44, hypeScore: 20,
    margin: "Medium", lifecycle: "Mainstream", sentiment: "Positive", reliability: "Durable Demand",
    price: "$8–19", competition: "Medium", creatorFit: "Strong", velocity: "4,400/wk", estMargin: "40–55%",
    desc: "Electric fabric defuzzers/shavers. Excellent satisfying-content potential. Steady household demand.",
  },
];

export const products: ProductOpportunity[] = productSeeds.map((s, i) => ({
  id: s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  name: s.name,
  category: s.cat,
  imagePlaceholder: "demo",
  opportunityScore: s.score,
  recommendation: s.rec,
  tiktokMomentum: s.tiktok,
  amazonSaturation: s.amazon,
  tiktokToAmazonGap: s.gap,
  trendsValidation: s.validation,
  creatorMomentum: s.creatorM,
  saturationScore: s.satScore,
  hypeRiskScore: s.hypeScore,
  marginPotential: s.margin,
  lifecycleStage: s.lifecycle,
  reviewSentiment: s.sentiment,
  trendReliability: s.reliability,
  priceEstimate: s.price,
  competitionLevel: s.competition,
  creatorFit: s.creatorFit,
  trendData: series(500 + i, 60, s.score - 10, s.score > 70 ? 0.3 : 0.1, 3),
  searchData: series(600 + i, 60, 45, s.score > 70 ? 0.5 : 0.2, 5),
  briefing: buildProductBriefing(s),
  whyTrending: buildWhyTrending(s),
  risks: buildRisks(s),
  recommendedAction: buildAction(s),
  differentiationIdeas: buildDifferentiation(s),
  creatorStrategy: buildCreatorStrat(s),
  topKeywords: buildKeywords(s),
  estimatedMargin: s.estMargin,
  weeklyVelocity: s.velocity,
  description: s.desc,
}));

function buildProductBriefing(s: ProductSeed): string {
  const lines = [
    `${s.name} show${s.tiktok === "Strong" || s.tiktok === "High" ? "s strong" : s.tiktok === "Rising" ? "s rising" : "s"} TikTok momentum with ${s.tiktok.toLowerCase()} creator activity.`,
    `Amazon saturation is ${s.amazon.toLowerCase()}${s.amazon === "Low" ? " — potential early-mover advantage" : s.amazon === "Medium" ? " — moderate competition" : " — competitive market"}.`,
  ];
  if (s.gap.includes("Strong Gap")) lines.push("The TikTok-to-Amazon gap is significant — TikTok demand is not yet fully reflected on Amazon.");
  if (s.hypeScore > 60) lines.push(`Hype risk is elevated at ${s.hypeScore}/100 — attention may be outpacing sustainable demand.`);
  if (s.margin === "Good") lines.push("Margin potential is favorable for differentiated sellers.");
  lines.push(`Lifecycle stage is ${s.lifecycle.toLowerCase()} — ${s.lifecycle === "Breakout" ? "act quickly before mainstream saturation" : s.lifecycle === "Emerging" ? "early opportunity window" : s.lifecycle === "Saturating" ? "consider only if you can differentiate meaningfully" : "steady-state market"}.`);
  return lines.join(" ");
}

function buildWhyTrending(s: ProductSeed): string[] {
  const reasons: string[] = [];
  if (s.creatorM === "High") reasons.push("Strong creator-led content cycle driving discovery");
  if (s.tiktok === "Strong" || s.tiktok === "High") reasons.push("High-engagement TikTok demo content with strong before/after or transformation appeal");
  if (s.validation === "Strong") reasons.push("Rising Google search interest confirms genuine demand, not just social noise");
  if (s.margin === "Good") reasons.push("Favorable unit economics attracting seller interest");
  if (s.lifecycle === "Breakout") reasons.push("Category in breakout phase — early mainstream adoption with room to grow");
  if (s.lifecycle === "Emerging") reasons.push("Early-stage adoption — potential first-mover advantage");
  if (s.cat === "Beauty" || s.cat === "Skincare" || s.cat === "Haircare") reasons.push("Beauty/skincare categories show strong repeat-purchase patterns");
  if (reasons.length < 3) reasons.push("Growing consumer interest driving consistent demand");
  return reasons.slice(0, 4);
}

function buildRisks(s: ProductSeed): string[] {
  const risks: string[] = [];
  if (s.hypeScore > 60) risks.push("High hype risk — viral attention may not translate to sustained demand");
  if (s.satScore > 65) risks.push("Increasing saturation — more sellers entering weekly, compressing margins");
  if (s.competition === "Extreme" || s.competition === "High") risks.push(`${s.competition.toLowerCase()} competition — difficult to rank organically without significant ad spend`);
  if (s.margin === "Thin" || s.margin === "Negative") risks.push("Thin margins after Amazon fees, advertising, and fulfillment costs");
  if (s.sentiment === "Mixed" || s.sentiment === "Negative") risks.push("Mixed reviews indicate quality inconsistency or unmet expectations");
  if (s.cat === "Skincare" || s.cat === "Beauty") risks.push("Claims and ingredient compliance risk — verify regulatory requirements before sourcing");
  if (s.lifecycle === "Saturating" || s.lifecycle === "Declining") risks.push(`${s.lifecycle} lifecycle — demand may be peaking or declining`);
  if (risks.length < 2) risks.push("Standard new-product risk — test demand with small batches before scaling");
  return risks.slice(0, 4);
}

function buildAction(s: ProductSeed): string {
  const map: Record<ProductRecommendation, string> = {
    "Test Now": "Test small inventory immediately. Prioritize differentiated branding and creator partnerships. Monitor saturation weekly.",
    "Test Small": "Order a small test batch. Focus on unique packaging and micro-creator reviews. Validate demand before scaling.",
    "Watch Closely": "Monitor momentum weekly. Review saturation trends and margin data before committing to inventory.",
    "Watch": "Stable opportunity. Differentiate with quality, bundles, or niche positioning. Lower urgency than other products.",
    "Source Small Batch": "Source a conservative initial order. Test with organic TikTok content before paid creator outreach.",
    "Creator Opportunity": "Prioritize creator partnerships over retail listing. Strong affiliate/content monetization potential.",
    "Amazon Gap Opportunity": "List on Amazon while competition is low. Optimize for category keywords. Move quickly — gap may close.",
    "Saturated": "Avoid generic listings. Only enter if you have a clear differentiation strategy, strong reviews, or lower cost.",
    "Avoid": "Not recommended. High saturation, low margins, or compliance risks make this a poor opportunity for most sellers.",
    "Avoid Overbuying": "High hype risk. If you must test, use the smallest viable order. Prices are compressing rapidly.",
    "Trend Dying": "Demand declining. Consider liquidating inventory and reallocating to emerging opportunities.",
    "High Hype Risk": "Proceed with extreme caution. Viral spikes rarely sustain. Do not overbuy inventory.",
    "Differentiate": "Enter only with clear differentiation — unique design, premium materials, bundle strategy, or niche positioning.",
    "Strong Margin Potential": "Favorable economics. Prioritize quality control and branding to protect margins as competition increases.",
  };
  return map[s.rec] || "Monitor and evaluate based on your specific business model and risk tolerance.";
}

function buildDifferentiation(s: ProductSeed): string[] {
  const ideas: string[] = [];
  if (s.cat === "Beauty" || s.cat === "Skincare" || s.cat === "Haircare") {
    ideas.push("Premium packaging with gift-ready unboxing experience");
    ideas.push("Bundle with complementary products (e.g., serum + applicator)");
    ideas.push("Branded instructional content and QR-code how-to guides");
  } else if (s.cat === "Kitchen Gadgets" || s.cat === "Home Gadgets") {
    ideas.push("Include recipe/usage guide to increase perceived value");
    ideas.push("Offer color variants not yet common in the category");
    ideas.push("Bundle with cleaning accessories or replacement parts");
  } else if (s.cat === "Pet Products") {
    ideas.push("Eco-friendly materials messaging for conscious pet owners");
    ideas.push("Size variants for different breeds not commonly served");
    ideas.push("Subscription refill model for consumable pet products");
  } else {
    ideas.push("Premium material upgrade over standard listings");
    ideas.push("Unique color/size variants to stand out in search results");
    ideas.push("Value-add insert (guide, warranty card, thank-you note)");
  }
  return ideas.slice(0, 3);
}

function buildCreatorStrat(s: ProductSeed): string {
  if (s.creatorFit === "Strong" && s.cat === "Beauty") return "Partner with beauty micro-creators (10K–100K). Before/after content performs best. Gift product for honest reviews.";
  if (s.creatorFit === "Strong" && s.cat === "Pet Products") return "Pet-owner creators with engaged audiences. Demo content showing product in use with pets. Emotional storytelling angle.";
  if (s.creatorFit === "Strong") return "Micro-creator partnerships with authentic demo content. Focus on creators whose audience matches the product's use case.";
  if (s.creatorFit === "Moderate") return "Target niche creators in adjacent categories. How-to and review content tends to convert better than pure entertainment.";
  return "Creator strategy may not be optimal for this product. Consider search-based discovery or marketplace optimization instead.";
}

function buildKeywords(s: ProductSeed): string[] {
  const base = s.name.toLowerCase().split(" ");
  const extras: Record<string, string[]> = {
    Beauty: ["tiktok made me buy it", "viral beauty", "beauty tools"],
    Skincare: ["skincare routine", "glass skin", "self care products"],
    Haircare: ["hair routine", "heatless hair", "hair tools"],
    "Pet Products": ["pet essentials", "dog must haves", "pet grooming"],
    "Kitchen Gadgets": ["kitchen must haves", "cooking tools", "kitchen organization"],
    "Baby/Kids": ["baby essentials", "toddler toys", "mom must haves"],
    "Home Office": ["desk setup", "wfh essentials", "desk organization"],
  };
  return [...base, ...(extras[s.cat]?.slice(0, 2) || ["amazon finds", "trending products"])].slice(0, 5);
}

// ── COMMERCE INDEXES ──

export const commerceIndexes: CommerceIndex[] = [
  {
    id: "beauty-signal", name: "Beauty Signal Index", category: "Beauty", score: 86, weeklyChange: 9, monthlyChange: 14,
    opportunityCount: 1420, saturationRisk: "Medium", avgMargin: "Good",
    description: "Tracks product opportunity across beauty tools, haircare, skincare gadgets, and personal care accessories.",
    trendData: series(70, 60, 72, 0.28, 2.6),
    summary: "Beauty shows the strongest category momentum driven by creator-led products, repeat-purchase potential, and visual content formats.",
    topRising: ["Heatless Curling Kit", "Lash Growth Serum", "Ice Roller"],
    topSaturated: ["Scalp Massager Brush", "Under-Eye Patches"],
    topCreatorLed: ["Lash Growth Serum", "Heatless Curling Kit", "Electric Makeup Brush Cleaner"],
  },
  {
    id: "home-gadgets-signal", name: "Home Gadgets Signal Index", category: "Home Gadgets", score: 78, weeklyChange: 6, monthlyChange: 9,
    opportunityCount: 890, saturationRisk: "Medium", avgMargin: "Medium",
    description: "Tracks product opportunity across smart home gadgets, organization tools, and household convenience products.",
    trendData: series(71, 60, 62, 0.2, 2.8),
    summary: "Home gadgets maintain steady growth with organization content driving discovery. Saturation varies significantly by sub-category.",
    topRising: ["Mini Label Maker", "Desk Vacuum"],
    topSaturated: ["Mini Thermal Printer", "Mini Projector"],
    topCreatorLed: ["Mini Label Maker", "Desk Vacuum"],
  },
  {
    id: "pet-products-signal", name: "Pet Products Signal Index", category: "Pet Products", score: 74, weeklyChange: 5, monthlyChange: 8,
    opportunityCount: 620, saturationRisk: "Low", avgMargin: "Good",
    description: "Tracks product opportunity across pet grooming, toys, accessories, and pet-parent convenience products.",
    trendData: series(72, 60, 58, 0.3, 2.2),
    summary: "Pet products show strong emotional-content fit with dedicated audiences. Category reliability is higher than most commerce categories.",
    topRising: ["Pet Hair Remover Roller", "Dog Anxiety Toy"],
    topSaturated: [],
    topCreatorLed: ["Pet Hair Remover Roller", "Dog Anxiety Toy"],
  },
  {
    id: "fitness-signal", name: "Fitness Accessories Signal Index", category: "Fitness Accessories", score: 71, weeklyChange: 4, monthlyChange: 6,
    opportunityCount: 480, saturationRisk: "Medium", avgMargin: "Medium",
    description: "Tracks product opportunity across fitness accessories, recovery tools, and home workout products.",
    trendData: series(73, 60, 56, 0.18, 2.5),
    summary: "Fitness accessories benefit from New Year and summer seasonality. Recovery and wellness-adjacent products outperform pure fitness gear.",
    topRising: ["Sleep Headphones", "Ice Roller"],
    topSaturated: ["Viral Waist Trainer"],
    topCreatorLed: ["Shower Steamers", "Sleep Headphones"],
  },
  {
    id: "kitchen-gadgets-signal", name: "Kitchen Gadgets Signal Index", category: "Kitchen Gadgets", score: 69, weeklyChange: 3, monthlyChange: 5,
    opportunityCount: 710, saturationRisk: "High", avgMargin: "Medium",
    description: "Tracks product opportunity across kitchen tools, cooking gadgets, and food-prep products.",
    trendData: series(74, 60, 55, 0.1, 2.9),
    summary: "Kitchen gadgets have strong demo content potential but saturation risk is elevated in many sub-categories. Focus on gaps.",
    topRising: ["Silicone Air Fryer Liners"],
    topSaturated: ["Portable Blender", "Vegetable Chopper"],
    topCreatorLed: ["Vegetable Chopper", "Silicone Air Fryer Liners"],
  },
  {
    id: "baby-kids-signal", name: "Baby/Kids Signal Index", category: "Baby/Kids", score: 66, weeklyChange: 5, monthlyChange: 7,
    opportunityCount: 340, saturationRisk: "Low", avgMargin: "Good",
    description: "Tracks product opportunity across baby products, kids toys, and parenting accessories.",
    trendData: series(75, 60, 50, 0.35, 2.0),
    summary: "Baby/kids category shows lower saturation with strong gift and seasonal dynamics. Parent-content creators are an underutilized channel.",
    topRising: ["Reusable Water Balloons", "Kids Drawing Projector", "Baby Food Feeder"],
    topSaturated: [],
    topCreatorLed: ["Reusable Water Balloons", "Kids Drawing Projector"],
  },
  {
    id: "fashion-accessories-signal", name: "Fashion Accessories Signal Index", category: "Fashion Accessories", score: 64, weeklyChange: 2, monthlyChange: 4,
    opportunityCount: 520, saturationRisk: "High", avgMargin: "Medium",
    description: "Tracks product opportunity across fashion accessories, wearable trends, and style products.",
    trendData: series(76, 60, 54, 0.08, 3.1),
    summary: "Fashion accessories are highly trend-driven with shorter lifecycle windows. Focus on emerging signals rather than mainstream saturation.",
    topRising: [],
    topSaturated: ["Viral Waist Trainer"],
    topCreatorLed: [],
  },
  {
    id: "wellness-signal", name: "Wellness Signal Index", category: "Wellness", score: 62, weeklyChange: 4, monthlyChange: 6,
    opportunityCount: 390, saturationRisk: "Medium", avgMargin: "Good",
    description: "Tracks product opportunity across wellness products, self-care items, and relaxation accessories.",
    trendData: series(77, 60, 48, 0.25, 2.3),
    summary: "Wellness products show rising demand with strong repeat purchase potential. Self-care content is a growing creator category.",
    topRising: ["Shower Steamers", "Sleep Headphones"],
    topSaturated: ["LED Face Mask"],
    topCreatorLed: ["Shower Steamers"],
  },
  {
    id: "cleaning-signal", name: "Cleaning Signal Index", category: "Cleaning", score: 58, weeklyChange: 1, monthlyChange: 3,
    opportunityCount: 280, saturationRisk: "Low", avgMargin: "Medium",
    description: "Tracks product opportunity across cleaning tools, organization products, and home-maintenance gadgets.",
    trendData: series(78, 60, 50, 0.05, 1.8),
    summary: "Cleaning products have lower virality but more stable demand patterns. Organization content drives consistent discovery.",
    topRising: ["Portable Fabric Shaver", "Pet Hair Remover Roller"],
    topSaturated: [],
    topCreatorLed: ["Portable Fabric Shaver"],
  },
  {
    id: "travel-signal", name: "Travel Signal Index", category: "Travel", score: 60, weeklyChange: 3, monthlyChange: 5,
    opportunityCount: 310, saturationRisk: "Low", avgMargin: "Good",
    description: "Tracks product opportunity across travel accessories, packing solutions, and on-the-go convenience products.",
    trendData: series(79, 60, 48, 0.15, 2.4),
    summary: "Travel accessories benefit from seasonal peaks and steady base demand. Low saturation in several sub-categories.",
    topRising: ["Travel Jewelry Organizer", "Collapsible Water Bottle"],
    topSaturated: [],
    topCreatorLed: ["Foldable Makeup Bag"],
  },
  {
    id: "tech-accessories-signal", name: "Tech Accessories Signal Index", category: "Tech Accessories", score: 56, weeklyChange: 0, monthlyChange: 2,
    opportunityCount: 420, saturationRisk: "Medium", avgMargin: "Medium",
    description: "Tracks product opportunity across tech accessories, gadget add-ons, and electronics-adjacent products.",
    trendData: series(80, 60, 52, -0.02, 2.6),
    summary: "Tech accessories have steady demand but lower breakout potential than beauty or home gadgets. Focus on underserved niches.",
    topRising: ["Magnetic Cable Organizer"],
    topSaturated: ["Cheap Smartwatch Clone", "Mini Thermal Printer"],
    topCreatorLed: [],
  },
];

// ── COMMERCE FORECASTS ──

const commerceForecastSeeds = [
  { q: "Will Heatless Curling Kits increase TikTok Shop sales by 50% in the next 30 days?", cat: "Commerce" as const, prob: 68, t7: 8, t24: 1.3, count: 8400, date: "Jul 19, 2026", validation: "Strong" as ValidationStrength, hype: "Medium" as const, momentum: 42, reliability: "Reliable Signal" as const, productId: "heatless-curling-kit" },
  { q: "Will Mini Label Makers enter Amazon top 100 in Home Office within 60 days?", cat: "Commerce" as const, prob: 62, t7: 5, t24: 0.9, count: 5200, date: "Aug 18, 2026", validation: "Moderate" as ValidationStrength, hype: "Low" as const, momentum: 28, reliability: "Mixed Signal" as const, productId: "mini-label-maker" },
  { q: "Will Portable Blenders decline in product momentum within 30 days?", cat: "Commerce" as const, prob: 71, t7: 4, t24: 0.6, count: 6800, date: "Jul 19, 2026", validation: "Moderate" as ValidationStrength, hype: "High" as const, momentum: 18, reliability: "Reliable Signal" as const, productId: "portable-blender" },
  { q: "Will Pet Hair Remover Rollers become saturated within 90 days?", cat: "Commerce" as const, prob: 44, t7: 3, t24: 0.5, count: 3900, date: "Sep 17, 2026", validation: "Moderate" as ValidationStrength, hype: "Medium" as const, momentum: 22, reliability: "Mixed Signal" as const, productId: "pet-hair-remover-roller" },
  { q: "Will Under-Eye Patches maintain strong demand through Q4 2026?", cat: "Commerce" as const, prob: 65, t7: -2, t24: -0.3, count: 5600, date: "Dec 31, 2026", validation: "Strong" as ValidationStrength, hype: "Low" as const, momentum: 32, reliability: "Reliable Signal" as const, productId: "under-eye-patches" },
  { q: "Will Scalp Massagers double Google search interest within 60 days?", cat: "Commerce" as const, prob: 38, t7: -4, t24: -0.7, count: 4100, date: "Aug 18, 2026", validation: "Moderate" as ValidationStrength, hype: "Medium" as const, momentum: 10, reliability: "Weak Signal" as const, productId: "scalp-massager-brush" },
  { q: "Will Silicone Air Fryer Liners remain profitable after Amazon fees and ads?", cat: "Commerce" as const, prob: 58, t7: 1, t24: 0.2, count: 3200, date: "Sep 17, 2026", validation: "Strong" as ValidationStrength, hype: "Low" as const, momentum: 14, reliability: "Reliable Signal" as const, productId: "silicone-air-fryer-liners" },
  { q: "Will Travel Jewelry Organizers become a Q4 2026 gift trend?", cat: "Commerce" as const, prob: 72, t7: 10, t24: 2.1, count: 2800, date: "Dec 31, 2026", validation: "Strong" as ValidationStrength, hype: "Medium" as const, momentum: 48, reliability: "Early Signal" as const, productId: "travel-jewelry-organizer" },
  { q: "Will Reusable Water Balloons hit 50K+ weekly Amazon sales by Q3 2026?", cat: "Commerce" as const, prob: 66, t7: 7, t24: 1.1, count: 4400, date: "Sep 30, 2026", validation: "Strong" as ValidationStrength, hype: "Medium" as const, momentum: 36, reliability: "Reliable Signal" as const, productId: "reusable-water-balloons" },
  { q: "Will LED Face Mask sales decline 30%+ within 6 months?", cat: "Commerce" as const, prob: 77, t7: 6, t24: 0.9, count: 5200, date: "Dec 19, 2026", validation: "Weak" as ValidationStrength, hype: "High" as const, momentum: 24, reliability: "Reliable Signal" as const, productId: "led-face-mask" },
  { q: "Will Lash Growth Serums face regulatory restriction in the US within 12 months?", cat: "Commerce" as const, prob: 42, t7: 2, t24: 0.3, count: 3100, date: "Jun 19, 2027", validation: "Weak" as ValidationStrength, hype: "Medium" as const, momentum: 12, reliability: "Mixed Signal" as const, productId: "lash-growth-serum" },
  { q: "Will Dog Anxiety Toys sustain >4.5 star rating through Q4 2026?", cat: "Commerce" as const, prob: 74, t7: 3, t24: 0.5, count: 2900, date: "Dec 31, 2026", validation: "Strong" as ValidationStrength, hype: "Low" as const, momentum: 20, reliability: "Reliable Signal" as const, productId: "dog-anxiety-toy" },
];

export const commerceForecasts: Forecast[] = commerceForecastSeeds.map((s, i) => ({
  id: s.q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60),
  question: s.q,
  category: s.cat,
  probability: s.prob,
  confidenceScore: 55 + ((i * 7) % 40),
  forecastCount: s.count,
  uniqueForecasters: Math.round(s.count * 0.38),
  trend24h: s.t24,
  trend7d: s.t7,
  resolutionDate: s.date,
  resolutionCriteria: "Resolves YES if the stated condition is verifiably met by the resolution date according to marketplace and search data; otherwise resolves NO.",
  sourceOfTruth: "Amazon Best Sellers Rank, TikTok Shop data, Google Trends, and credible marketplace analytics",
  status: s.t7 < -4 ? "Closing Soon" : "Open",
  reliabilityLabel: s.reliability,
  trendsValidation: s.validation,
  hypeRisk: s.hype,
  searchMomentum: s.momentum,
  trendData: series(100 + i, 60, s.prob - s.t7, s.t7 / 60, 2.4),
  searchData: series(200 + i, 60, 50, s.momentum / 60, 4),
  briefing: `Crowd probability ${s.t7 >= 0 ? "increased" : "declined"} ${Math.abs(s.t7)} points this week. ${
    s.hype === "High" ? "Hype risk is elevated — viral attention may not translate to sustained commerce demand." :
    s.validation === "Strong" ? "Search-interest data strongly supports this forecast direction." :
    "Monitor search and marketplace data for confirmation."
  }`,
  bullCase: [
    "Creator content cycle continues driving discovery",
    "Search interest remains elevated or growing",
    "Category fundamentals support continued demand",
    "Low competition allows for margin maintenance",
    "Seasonal tailwinds strengthen demand",
  ],
  bearCase: [
    "Creator content saturates and engagement declines",
    "Amazon competition increases faster than demand",
    "Search interest plateaus or reverses",
    "Price compression erodes seller margins",
    "Trend lifecycle proves shorter than expected",
  ],
  catalysts: ["TikTok trend velocity data", "Amazon BSR movements", "Google Trends updates", "Creator engagement metrics", "New competitor listings"],
  expertProb: Math.max(2, Math.min(98, s.prob + ((i % 5) - 2) * 6)),
  productId: s.productId,
}));

// ── COMBINED FORECASTS ──

// Keep original forecast seeds for backwards compat but update context
const legacySeeds = [
  { q: "Will Bitcoin exceed $200,000 before January 2028?", cat: "Crypto" as Category, prob: 67, t7: 7, t24: 1.2, count: 31240, date: "Jan 1, 2028", validation: "Moderate" as ValidationStrength, hype: "Medium" as const, momentum: 28, reliability: "Mixed Signal" as const },
  { q: "Will AI agents handle more than 30% of enterprise support tickets by 2030?", cat: "AI" as Category, prob: 71, t7: 9, t24: 1.6, count: 44900, date: "Dec 31, 2030", validation: "Strong" as ValidationStrength, hype: "Low" as const, momentum: 39, reliability: "Reliable Signal" as const },
  { q: "Will mortgage rates fall below 4% before 2027?", cat: "Housing" as Category, prob: 32, t7: -6, t24: -0.8, count: 19800, date: "Jan 1, 2027", validation: "Moderate" as ValidationStrength, hype: "Low" as const, momentum: 21 },
  { q: "Will a major AI startup IPO before 2028?", cat: "Startups" as Category, prob: 49, t7: -5, t24: -0.6, count: 14600, date: "Dec 31, 2027", validation: "Weak" as ValidationStrength, hype: "Medium" as const, momentum: 9, reliability: "Mixed Signal" as const },
  { q: "Will Ethereum reach $15,000 before 2030?", cat: "Crypto" as Category, prob: 52, t7: 4, t24: 0.7, count: 26700, date: "Dec 31, 2029", validation: "Weak" as ValidationStrength, hype: "High" as const, momentum: -8, reliability: "Overheated Signal" as const },
  { q: "Will the US enter a recession before the end of 2027?", cat: "Economy" as Category, prob: 43, t7: 6, t24: 1.1, count: 51200, date: "Dec 31, 2027", validation: "Strong" as ValidationStrength, hype: "Medium" as const, momentum: 37 },
  { q: "Will AI-generated video become mainstream in advertising by 2027?", cat: "AI" as Category, prob: 64, t7: 8, t24: 1.4, count: 24100, date: "Dec 31, 2026", validation: "Strong" as ValidationStrength, hype: "Medium" as const, momentum: 52, reliability: "Reliable Signal" as const },
  { q: "Will AI meaningfully reduce software development hiring by 2030?", cat: "AI" as Category, prob: 57, t7: 7, t24: 1.2, count: 38600, date: "Dec 31, 2030", validation: "Strong" as ValidationStrength, hype: "Medium" as const, momentum: 46 },
  { q: "Will a major country introduce a central bank digital currency before 2030?", cat: "Geopolitics" as Category, prob: 51, t7: 2, t24: 0.3, count: 12600, date: "Dec 31, 2029", validation: "Weak" as ValidationStrength, hype: "Medium" as const, momentum: 13 },
  { q: "Will home insurance become materially harder to obtain in high-risk US states by 2030?", cat: "Housing" as Category, prob: 71, t7: 3, t24: 0.4, count: 10300, date: "Dec 31, 2030", validation: "Strong" as ValidationStrength, hype: "Low" as const, momentum: 24, reliability: "Reliable Signal" as const },
];

const reliabilityByCat: Record<string, Forecast["reliabilityLabel"]> = {
  AI: "Reliable Signal", Housing: "Reliable Signal", Economy: "Reliable Signal",
  Startups: "Mixed Signal", Energy: "Mixed Signal", Crypto: "Overheated Signal",
  Geopolitics: "Weak Signal", Technology: "Mixed Signal", Consumer: "Mixed Signal",
  Healthcare: "Mixed Signal",
};

export const forecasts: Forecast[] = [
  ...commerceForecasts,
  ...legacySeeds.map((s, i) => ({
    id: s.q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60),
    question: s.q,
    category: s.cat,
    probability: s.prob,
    confidenceScore: 55 + ((i * 7) % 40),
    forecastCount: s.count,
    uniqueForecasters: Math.round(s.count * 0.42),
    trend24h: s.t24,
    trend7d: s.t7,
    resolutionDate: s.date,
    resolutionCriteria: "Resolves YES if the stated condition is verifiably met by the resolution date.",
    sourceOfTruth: "Credible public data and reporting",
    status: s.t7 < -4 ? "Closing Soon" : "Open",
    reliabilityLabel: s.reliability ?? reliabilityByCat[s.cat],
    trendsValidation: s.validation,
    hypeRisk: s.hype,
    searchMomentum: s.momentum,
    trendData: series(300 + i, 60, s.prob - s.t7, s.t7 / 60, 2.4),
    searchData: series(400 + i, 60, 50, s.momentum / 60, 4),
    briefing: `Crowd probability ${s.t7 >= 0 ? "increased" : "declined"} ${Math.abs(s.t7)} points.`,
    bullCase: ["Fundamentals continue improving", "Adoption and attention rising", "Leading indicators confirm direction"],
    bearCase: ["Macro conditions deteriorate", "Counter-trend signals emerge", "Timeline proves aggressive"],
    catalysts: ["Data releases", "Policy decisions", "Market movements"],
    expertProb: Math.max(2, Math.min(98, s.prob + ((i % 5) - 2) * 6)),
  })),
];

// ── LEGACY INDEXES (kept for Indexes page) ──

export const indexes: IndexItem[] = [
  { id: "ai-confidence", name: "AI Confidence Index", category: "AI", score: 86, weeklyChange: 8, monthlyChange: 14, forecastVolume: 134000, crowdAccuracy: 78, trendsValidation: "Strong", reliabilityGrade: "A-", description: "Measures global confidence in AI adoption and enterprise AI spending.", trendData: series(2, 60, 70, 0.3, 2.6), summary: "AI Confidence Index rose as crowd probabilities increased around AI agents and enterprise adoption.", drivers: [{ text: "Enterprise AI spending increases significantly in 2027", prob: 72 }, { text: "AI agents become common in enterprise workflows", prob: 68 }, { text: "AI reduces customer service headcount by 2030", prob: 61 }, { text: "A major AI company reaches $1T valuation before 2030", prob: 58 }] },
  { id: "crypto-confidence", name: "Crypto Confidence Index", category: "Crypto", score: 78, weeklyChange: 6, monthlyChange: 11, forecastVolume: 248000, crowdAccuracy: 61, trendsValidation: "Moderate", reliabilityGrade: "B-", description: "Measures confidence in Bitcoin, Ethereum, and institutional crypto demand.", trendData: series(5, 60, 64, 0.28, 5.2), summary: "Crypto Confidence climbed on ETF flows and institutional narratives.", drivers: [{ text: "Bitcoin exceeds $200,000 before January 2028", prob: 67 }, { text: "A major country adds Bitcoin to national reserves", prob: 41 }, { text: "A stablecoin becomes widely used for payments", prob: 58 }, { text: "Ethereum reaches $15,000 before 2030", prob: 52 }] },
  { id: "housing-confidence", name: "Housing Confidence Index", category: "Housing", score: 61, weeklyChange: -2, monthlyChange: 1, forecastVolume: 89000, crowdAccuracy: 74, trendsValidation: "Strong", reliabilityGrade: "A", description: "Measures expectations around home prices, mortgage rates, and affordability.", trendData: series(7, 60, 63, -0.04, 1.9), summary: "Housing confidence softened as mortgage-rate-relief probabilities fell.", drivers: [{ text: "Austin home prices rise more than 15% by 2028", prob: 64 }, { text: "Mortgage rates fall below 4% before 2027", prob: 32 }, { text: "US home inventory normalizes before 2028", prob: 47 }, { text: "Home insurance becomes harder to obtain in high-risk states", prob: 71 }] },
  { id: "startup-confidence", name: "Startup Confidence Index", category: "Startups", score: 54, weeklyChange: -3, monthlyChange: -6, forecastVolume: 42000, crowdAccuracy: 69, trendsValidation: "Moderate", reliabilityGrade: "B+", description: "Measures confidence around venture funding, IPOs, and startup hiring.", trendData: series(13, 60, 60, -0.12, 2.8), summary: "Startup confidence eased as IPO timing expectations slipped.", drivers: [{ text: "A major AI startup IPOs before 2028", prob: 49 }, { text: "Venture funding rebounds meaningfully before 2028", prob: 53 }, { text: "Private forecasting becomes a standard enterprise tool", prob: 44 }, { text: "A new social platform reaches 500M users before 2030", prob: 38 }] },
  { id: "economy-confidence", name: "Economy Confidence Index", category: "Economy", score: 58, weeklyChange: -4, monthlyChange: -7, forecastVolume: 120000, crowdAccuracy: 71, trendsValidation: "Strong", reliabilityGrade: "A-", description: "Measures confidence in GDP growth, inflation, interest rates, and recession risk.", trendData: series(17, 60, 64, -0.16, 2.2), summary: "Economic confidence declined as recession-risk and inflation probabilities ticked higher.", drivers: [{ text: "The US enters a recession before the end of 2027", prob: 43 }, { text: "Inflation returns above 5% before 2028", prob: 36 }, { text: "The average US new car price declines before 2028", prob: 41 }, { text: "Remote work increases again by 2028", prob: 48 }] },
  { id: "energy-confidence", name: "Energy Confidence Index", category: "Energy", score: 63, weeklyChange: 3, monthlyChange: 5, forecastVolume: 27000, crowdAccuracy: 70, trendsValidation: "Moderate", reliabilityGrade: "B+", description: "Measures expectations around nuclear, renewables, and electrification.", trendData: series(23, 60, 60, 0.12, 2.4), summary: "Energy confidence rose on accelerating nuclear-investment narratives.", drivers: [{ text: "Nuclear energy investment doubles by 2030", prob: 57 }, { text: "A major automaker goes fully electric by 2035", prob: 62 }, { text: "A major city bans gas-powered vehicles downtown by 2035", prob: 44 }, { text: "The global AI chip market doubles before 2030", prob: 74 }] },
  { id: "geopolitical-risk", name: "Geopolitical Risk Index", category: "Geopolitics", score: 47, weeklyChange: -5, monthlyChange: 4, forecastVolume: 74000, crowdAccuracy: 55, trendsValidation: "Weak", reliabilityGrade: "C+", description: "Measures perceived risk around elections, conflict, trade, and instability.", trendData: series(29, 60, 50, -0.1, 5.6), summary: "Geopolitical risk moved sharply. This category carries the platform's weakest reliability.", drivers: [{ text: "A major cyberattack disrupts a Fortune 500 company", prob: 59 }, { text: "A major country introduces a CBDC before 2030", prob: 51 }, { text: "Climate insurance premiums rise more than 25% by 2030", prob: 66 }, { text: "A major streaming platform merges with another media company", prob: 48 }] },
];

// ── CATEGORY ACCURACY ──

export const categoryAccuracy: CategoryAccuracy[] = [
  { category: "Beauty", accuracy: 76, overconfidence: 18, underreaction: 20, validation: "Strong", grade: "A-" },
  { category: "Pet Products", accuracy: 72, overconfidence: 14, underreaction: 22, validation: "Strong", grade: "A-" },
  { category: "Housing", accuracy: 74, overconfidence: 12, underreaction: 21, validation: "Strong", grade: "A" },
  { category: "Economy", accuracy: 71, overconfidence: 17, underreaction: 23, validation: "Strong", grade: "A-" },
  { category: "Startups", accuracy: 69, overconfidence: 21, underreaction: 26, validation: "Moderate", grade: "B+" },
  { category: "Energy", accuracy: 70, overconfidence: 18, underreaction: 24, validation: "Moderate", grade: "B+" },
  { category: "Kitchen Gadgets", accuracy: 64, overconfidence: 28, underreaction: 26, validation: "Moderate", grade: "B-" },
  { category: "Crypto", accuracy: 61, overconfidence: 33, underreaction: 28, validation: "Moderate", grade: "B-" },
  { category: "Viral Gadgets", accuracy: 58, overconfidence: 36, underreaction: 30, validation: "Weak", grade: "C+" },
  { category: "Geopolitics", accuracy: 55, overconfidence: 37, underreaction: 31, validation: "Weak", grade: "C+" },
];

// ── LEADERBOARD ──

export const leaderboard: ForecasterProfile[] = [
  { id: "maya-chen", name: "Maya Chen", avatar: "MC", bio: "Ecommerce strategist & product scout. Finding TikTok-to-Amazon gaps before they close.", userType: "Analyst", accuracyScore: 91.4, calibrationScore: 88.2, crowdBeaterRate: 63, forecastCount: 2140, resolvedCount: 1240, followers: 18400, following: 312, topCategories: [{ category: "Beauty", score: 92 }, { category: "Home Gadgets", score: 86 }, { category: "AI", score: 84 }], badges: ["Top 1% Product Forecaster", "Crowd Beater", "Early Signal Finder", "Gap Hunter", "Founding Forecaster"] },
  { id: "daniel-brooks", name: "Daniel Brooks", avatar: "DB", bio: "Amazon FBA strategist. I track saturation before it hits.", userType: "Seller", accuracyScore: 89.7, calibrationScore: 86.1, crowdBeaterRate: 59, forecastCount: 1890, resolvedCount: 1102, followers: 12300, following: 188, topCategories: [{ category: "Kitchen Gadgets", score: 90 }, { category: "Pet Products", score: 81 }, { category: "Economy", score: 74 }], badges: ["Saturation Spotter", "Crowd Beater", "Calibrated Mind"] },
  { id: "sofia-rivera", name: "Sofia Rivera", avatar: "SR", bio: "Beauty brand founder. I know which products will work before the crowd does.", userType: "Founder", accuracyScore: 87.9, calibrationScore: 85.4, crowdBeaterRate: 56, forecastCount: 1610, resolvedCount: 940, followers: 9800, following: 240, topCategories: [{ category: "Beauty", score: 89 }, { category: "Skincare", score: 79 }, { category: "Wellness", score: 76 }], badges: ["Beauty Oracle", "Crowd Beater", "Steady Hand"] },
  { id: "ethan-park", name: "Ethan Park", avatar: "EP", bio: "Creator economy analyst. Separating product signal from hype.", userType: "Analyst", accuracyScore: 86.5, calibrationScore: 82.0, crowdBeaterRate: 54, forecastCount: 2320, resolvedCount: 1410, followers: 14100, following: 401, topCategories: [{ category: "Crypto", score: 84 }, { category: "Gadgets", score: 77 }, { category: "Startups", score: 71 }], badges: ["Contrarian", "Crowd Beater", "Hype Detector"] },
  { id: "amara-singh", name: "Amara Singh", avatar: "AS", bio: "TikTok Shop product scout. I find trends before they hit Amazon.", userType: "Creator", accuracyScore: 85.8, calibrationScore: 83.3, crowdBeaterRate: 52, forecastCount: 1450, resolvedCount: 870, followers: 8600, following: 290, topCategories: [{ category: "Beauty", score: 86 }, { category: "Fashion Accessories", score: 80 }, { category: "Wellness", score: 75 }], badges: ["Trend Scout", "Crowd Beater", "Early Signal Finder"] },
  { id: "noah-kim", name: "Noah Kim", avatar: "NK", bio: "Pet product specialist. Tracking the pet-parent economy.", userType: "Seller", accuracyScore: 84.2, calibrationScore: 80.9, crowdBeaterRate: 51, forecastCount: 1280, resolvedCount: 760, followers: 6400, following: 150, topCategories: [{ category: "Pet Products", score: 83 }, { category: "Baby/Kids", score: 74 }, { category: "Home Gadgets", score: 68 }], badges: ["Pet Product Pro", "Calibrated Mind"] },
  { id: "lena-fischer", name: "Lena Fischer", avatar: "LF", bio: "Agency strategist. Helping brands identify product opportunities.", userType: "Agency", accuracyScore: 83.1, calibrationScore: 79.5, crowdBeaterRate: 49, forecastCount: 990, resolvedCount: 540, followers: 5200, following: 320, topCategories: [{ category: "Home Gadgets", score: 82 }, { category: "Kitchen Gadgets", score: 78 }, { category: "Cleaning Products", score: 70 }], badges: ["Signal Scout", "New Voice"] },
  { id: "marcus-webb", name: "Marcus Webb", avatar: "MW", bio: "Investor tracking commerce trends across platforms.", userType: "Investor", accuracyScore: 82.4, calibrationScore: 78.8, crowdBeaterRate: 48, forecastCount: 1120, resolvedCount: 610, followers: 4900, following: 210, topCategories: [{ category: "AI", score: 81 }, { category: "Startups", score: 73 }, { category: "Consumer", score: 69 }], badges: ["Commerce Eye", "Crowd Beater"] },
];

export const currentUser: ForecasterProfile = {
  id: "you", name: "You", avatar: "YOU", bio: "Building a product forecasting track record on Signal Crowd.", userType: "Founder",
  accuracyScore: 84.2, calibrationScore: 81.6, crowdBeaterRate: 58, forecastCount: 312, resolvedCount: 184,
  followers: 1240, following: 96,
  topCategories: [{ category: "Beauty", score: 87 }, { category: "Home Gadgets", score: 79 }, { category: "Pet Products", score: 76 }],
  badges: ["Crowd Beater", "Early Signal Finder", "Founding Forecaster"],
};

// ── REPORTS ──

export const reports: Report[] = [
  { id: "tiktok-amazon-gap", title: "Weekly TikTok-to-Amazon Gap Report", category: "Commerce", price: 49, summary: "Top 25 gap opportunities with saturation warnings, margin notes, and search validation.", includes: ["Top 25 gap opportunities", "Saturation warnings", "Margin notes", "Search validation", "Recommended actions"], pages: 24, updated: "Updated weekly" },
  { id: "beauty-product-signal", title: "Beauty Product Signal Report", category: "Beauty", price: 49, summary: "Top beauty trends, creator-led products, saturation signals, and margin opportunities.", includes: ["Top beauty trends", "Creator-led products", "Products becoming saturated", "Margin opportunities", "Product differentiation ideas"], pages: 22, updated: "Updated weekly" },
  { id: "viral-avoid", title: "Viral Products to Avoid Report", category: "Commerce", price: 49, summary: "High hype risk products with saturation signals, margin warnings, and safer alternatives.", includes: ["High hype risk products", "Saturation signals", "Margin warnings", "Compliance risks", "Safer alternatives"], pages: 18, updated: "Updated weekly" },
  { id: "creator-commerce", title: "Creator Commerce Report", category: "Commerce", price: 49, summary: "Best products for creators with content angles, affiliate fit, and saturation analysis.", includes: ["Best products for creators", "Product/category content angles", "Affiliate fit", "Creator saturation", "Recommended niches"], pages: 20, updated: "Updated weekly" },
  { id: "monthly-commerce", title: "Monthly Commerce Intelligence Report", category: "Commerce", price: 99, summary: "Category momentum, cross-platform trend analysis, and product lifecycle shifts.", includes: ["Category momentum", "Cross-platform trend analysis", "Search-validated products", "Product lifecycle shifts", "Seller opportunities"], pages: 38, updated: "Updated monthly" },
  { id: "weekly-ai", title: "Weekly AI Signal Report", category: "AI", price: 49, summary: "Deep analysis of the AI Confidence Index, top movers, and enterprise adoption signals.", includes: ["AI Confidence Index analysis", "AI forecast movers", "Trends validation", "Crowd reliability", "Enterprise AI adoption signals"], pages: 24, updated: "Updated weekly" },
];

// ── TODAY'S MOVES ──

export const todaysMoves = [
  { text: "Heatless Curling Kit opportunity score hit 84 — Test Now.", change: 8, positive: true },
  { text: "Reusable Water Balloons entered breakout stage — strong summer demand.", change: 7, positive: true },
  { text: "Portable Blender saturation risk increased to high.", change: -8, positive: false },
  { text: "Mini Thermal Printer hype risk spiked — viral but unsustainable.", change: -6, positive: false },
  { text: "Travel Jewelry Organizer gap opportunity emerging — Amazon demand lagging TikTok.", change: 5, positive: true },
];

export const briefingItems = [
  "Beauty Signal Index rose 9 points — strongest category momentum.",
  "Heatless Curling Kit opportunity score hit 84. Test Now recommendation.",
  "Portable Blender saturation risk is now high. Margin compression accelerating.",
  "Travel Jewelry Organizers showing strong TikTok gap — low Amazon competition.",
  "Mini Thermal Printers flagged: high hype risk, avoid overbuying inventory.",
  "Pet Hair Remover Roller: creator-led demand rising, still moderate Amazon saturation.",
  "Baby/Kids category showing early signals — Reusable Water Balloons and Drawing Projectors leading.",
];

// ── HIGH-RISK PRODUCTS FOR HYPE RISK PAGE ──

export const highRiskProducts = products.filter(p => p.hypeRiskScore >= 60 || p.recommendation === "Avoid" || p.recommendation === "Avoid Overbuying").slice(0, 5);

// ── CREATOR OPPORTUNITY PRODUCTS ──

export const creatorProducts = products.filter(p => p.creatorFit === "Strong" && p.opportunityScore >= 65).slice(0, 8);

// ── LOOKUP HELPERS ──

export function getProduct(id: string): ProductOpportunity | undefined {
  return products.find((p) => p.id === id);
}

export function getForecast(id: string): Forecast | undefined {
  return forecasts.find((f) => f.id === id);
}

export function getIndex(id: string): IndexItem | undefined {
  return indexes.find((i) => i.id === id);
}

export function getCommerceIndex(id: string): CommerceIndex | undefined {
  return commerceIndexes.find((i) => i.id === id);
}

export function getForecaster(id: string): ForecasterProfile | undefined {
  if (id === "you") return currentUser;
  return leaderboard.find((p) => p.id === id);
}
