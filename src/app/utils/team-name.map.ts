export const TEAM_NAME_MAP: Record<string, string> = {
  'McLaren Racing': 'McLaren',
  'Red Bull Racing': 'Red Bull',
  'Mercedes-AMG Petronas': 'Mercedes',
  'Scuderia Ferrari': 'Ferrari',
  'Aston Martin F1 Team': 'Aston Martin',
  'Haas F1 Team': 'Haas',
  'Williams F1 Team': 'Williams',
  'Alpine F1 Team': 'Alpine',
  'Stake F1 Team Kick Sauber': 'Kick Sauber',
  'Racing Bulls': 'Racing Bulls',
};

export function getTeamDisplayName(originalName: string): string {
  return TEAM_NAME_MAP[originalName] ?? originalName;
}
