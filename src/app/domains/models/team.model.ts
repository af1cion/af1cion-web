export interface TeamWithPilotsResponse {
  data: TeamWithPilots[];
  status: number;
  success: boolean;
}

export interface TeamWithPilots {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  logo: string;
  pilots: Pilot[];
  championship: TeamChampionship;
}

export interface Pilot {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  abbr: string | null;
  number: number;
  img: string;
  behind: number | null;
  wins: number;
}

export interface TeamChampionship {
  id: string;
  createdAt: string;
  updatedAt: string;
  position: number;
  points: number;
  season: number;
}
