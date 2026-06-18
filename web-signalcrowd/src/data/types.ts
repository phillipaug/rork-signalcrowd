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
  category: Category;
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
  topCategories: { category: Category; score: number }[];
  badges: string[];
}

export interface Report {
  id: string;
  title: string;
  category: Category | "Macro";
  price: number;
  summary: string;
  includes: string[];
  pages: number;
  updated: string;
}

export interface CategoryAccuracy {
  category: Category;
  accuracy: number;
  overconfidence: number;
  underreaction: number;
  validation: ValidationStrength;
  grade: string;
}
