export type Category =
  | "AI"
  | "Crypto"
  | "Housing"
  | "Economy"
  | "Startups"
  | "Energy"
  | "Geopolitics"
  | "Technology"
  | "Consumer"
  | "Healthcare";

export type ReliabilityLabel =
  | "Reliable Signal"
  | "Mixed Signal"
  | "Weak Signal"
  | "Overheated Signal"
  | "Contrarian Signal";

export type ValidationStrength = "Strong" | "Moderate" | "Weak" | "None";

export type HypeRisk = "Low" | "Medium" | "High";

export type ConfidenceLevel = "Low" | "Medium" | "High" | "Very High";

export type ForecastStatus = "Open" | "Resolved" | "Closing Soon";

// ── Commerce / Product Trend Types ──

export type ProductCategory =
  | "Beauty"
  | "Haircare"
  | "Skincare"
  | "Home Gadgets"
  | "Kitchen Gadgets"
  | "Pet Products"
  | "Baby/Kids"
  | "Fitness Accessories"
  | "Fashion Accessories"
  | "Wellness"
  | "Cleaning Products"
  | "Travel Accessories"
  | "Tech Accessories"
  | "Home Office"
  | "Gadgets";

export type LifecycleStage =
  | "Emerging"
  | "Accelerating"
  | "Breakout"
  | "Mainstream"
  | "Saturating"
  | "Declining"
  | "Seasonal"
  | "Evergreen";

export type ProductRecommendation =
  | "Test Now"
  | "Test Small"
  | "Watch Closely"
  | "Watch"
  | "Source Small Batch"
  | "Creator Opportunity"
  | "Amazon Gap Opportunity"
  | "Saturated"
  | "Avoid"
  | "Avoid Overbuying"
  | "Trend Dying"
  | "High Hype Risk"
  | "Differentiate"
  | "Strong Margin Potential";

export type TikTokMomentum = "Strong" | "Rising" | "High" | "Medium" | "Declining" | "Low";

export type AmazonSaturation = "High" | "Medium" | "Low" | "None";

export type GapLabel =
  | "Strong Gap Opportunity"
  | "Moderate Gap Opportunity"
  | "Already Saturated"
  | "TikTok Only"
  | "Amazon Demand Leading"
  | "Watchlist Opportunity";

export type MarginLabel = "Good" | "Medium" | "Thin" | "Negative";

export type CreatorFitLabel = "Strong" | "Moderate" | "Weak" | "None";

export type TrendReliability =
  | "Reliable Trend"
  | "Early Signal"
  | "Hype Risk"
  | "Short-Lived Spike"
  | "Saturated Trend"
  | "Unvalidated Trend"
  | "Durable Demand";

export type ValidationCategory =
  | "Strongly Validated"
  | "Social-Only Hype"
  | "Search-Led Demand"
  | "Seller Opportunity"
  | "Warning Zone";

export type CommerceIndexCategory =
  | "Beauty"
  | "Home Gadgets"
  | "Pet Products"
  | "Fitness Accessories"
  | "Kitchen Gadgets"
  | "Baby/Kids"
  | "Fashion Accessories"
  | "Wellness"
  | "Cleaning"
  | "Travel"
  | "Tech Accessories";

export interface CommerceIndex {
  id: string;
  name: string;
  category: CommerceIndexCategory;
  score: number;
  weeklyChange: number;
  monthlyChange: number;
  opportunityCount: number;
  saturationRisk: "Low" | "Medium" | "High";
  avgMargin: MarginLabel;
  description: string;
  trendData: number[];
  summary: string;
  topRising: string[];
  topSaturated: string[];
  topCreatorLed: string[];
}

export interface ProductOpportunity {
  id: string;
  name: string;
  category: ProductCategory;
  imagePlaceholder: string;
  opportunityScore: number;
  recommendation: ProductRecommendation;
  tiktokMomentum: TikTokMomentum;
  amazonSaturation: AmazonSaturation;
  tiktokToAmazonGap: GapLabel;
  trendsValidation: ValidationStrength;
  creatorMomentum: "High" | "Medium" | "Low";
  saturationScore: number;
  hypeRiskScore: number;
  marginPotential: MarginLabel;
  lifecycleStage: LifecycleStage;
  reviewSentiment: "Positive" | "Mixed" | "Negative";
  trendReliability: TrendReliability;
  priceEstimate: string;
  competitionLevel: "Low" | "Medium" | "High" | "Extreme";
  creatorFit: CreatorFitLabel;
  trendData: number[];
  searchData: number[];
  briefing: string;
  whyTrending: string[];
  risks: string[];
  recommendedAction: string;
  differentiationIdeas: string[];
  creatorStrategy: string;
  topKeywords: string[];
  estimatedMargin: string;
  weeklyVelocity: string;
  description: string;
}

export interface ProductAlert {
  id: string;
  productId: string;
  productName: string;
  type: string;
  message: string;
  createdAt: string;
}

// ── Original types (kept for backwards compat) ──

export interface IndexItem {
  id: string;
  name: string;
  category: Category;
  score: number;
  weeklyChange: number;
  monthlyChange: number;
  forecastVolume: number;
  crowdAccuracy: number;
  trendsValidation: ValidationStrength;
  reliabilityGrade: string;
  description: string;
  trendData: number[];
  summary: string;
  drivers: { text: string; prob: number }[];
}

export interface Forecast {
  id: string;
  question: string;
  category: Category | "Commerce";
  probability: number;
  confidenceScore: number;
  forecastCount: number;
  uniqueForecasters: number;
  trend24h: number;
  trend7d: number;
  resolutionDate: string;
  resolutionCriteria: string;
  sourceOfTruth: string;
  status: ForecastStatus;
  reliabilityLabel: ReliabilityLabel;
  trendsValidation: ValidationStrength;
  hypeRisk: HypeRisk;
  searchMomentum: number;
  trendData: number[];
  searchData: number[];
  briefing: string;
  bullCase: string[];
  bearCase: string[];
  catalysts: string[];
  expertProb: number;
  /** Commerce-specific: linked product ID */
  productId?: string;
}

export interface ForecasterProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  userType: string;
  accuracyScore: number;
  calibrationScore: number;
  crowdBeaterRate: number;
  forecastCount: number;
  resolvedCount: number;
  followers: number;
  following: number;
  topCategories: { category: Category | ProductCategory | string; score: number }[];
  badges: string[];
}

export interface Report {
  id: string;
  title: string;
  category: Category | "Macro" | ProductCategory | "Commerce";
  price: number;
  summary: string;
  includes: string[];
  pages: number;
  updated: string;
}

export interface CategoryAccuracy {
  category: Category | string;
  accuracy: number;
  overconfidence: number;
  underreaction: number;
  validation: ValidationStrength;
  grade: string;
}
