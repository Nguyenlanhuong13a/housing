export interface ScoreData {
  type: "safety" | "growth" | "business" | "family";
  score: number;
  label: string;
  explanation: string;
}

export const mockDashboardData = {
  location: "Silver Lake, Los Angeles",
  lastUpdated: "January 2026",
  scores: [
    {
      type: "safety",
      score: 76,
      label: "Safety Score",
      explanation: "Low violent crime rates. Most incidents are related to property/package theft."
    },
    {
      type: "growth",
      score: 88,
      label: "Growth Score",
      explanation: "Permit activity up 24% YoY. High concentration of renovation and new commercial builds."
    },
    {
      type: "business",
      score: 82,
      label: "Business Activity",
      explanation: "High foot traffic in central corridors. Very low commercial vacancy rates (under 4%)."
    },
    {
      type: "family",
      score: 72,
      label: "Family Score",
      explanation: "Good elementary school access. Park density is high, though street parking is tight."
    }
  ] as ScoreData[]
};
