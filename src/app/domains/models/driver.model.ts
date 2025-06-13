export interface DriverResponse {
  data: Driver[];
  status: number;
  success: boolean;
}

export interface Driver {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  abbr: string | null;
  number: number;
  img: string;
  behind: number | null;
  wins: number;
  team: Team;
  championship: Championship;
}

export interface Team {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  logo: string;
}

export interface Championship {
  id: string;
  createdAt: string;
  updatedAt: string;
  position: number;
  points: number | null;
  season: number;
}
