export interface LocationScore {
  safety: number;
  growth: number;
  business: number;
  family: number;
}

export interface NeighborhoodReport {
  location: string;
  zipCode: string;
  state: string;
  lastUpdated: string;
  scores: LocationScore;
}

export interface CrimeDataPoint {
  id: string;
  type: string;
  severity: "low" | "medium" | "high";
  coordinates: [number, number]; // [lng, lat]
  timestamp: string;
}

export interface PermitDataPoint {
  id: string;
  type: string;
  status: string;
  value: number;
  coordinates: [number, number]; // [lng, lat]
  timestamp: string;
}
