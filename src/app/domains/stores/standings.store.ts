import { inject, InjectionToken } from '@angular/core';
import { signalStore, withHooks, withState, patchState } from '@ngrx/signals';
import { DriverService, TeamService } from '@domains/services';
import { getTeamDisplayName } from '@utils/team-name.map';

interface Driver {
  position: number;
  name: string;
  team: string;
  points: number;
}

interface Team {
  position: number;
  pilots: { name: string }[];
  team: string;
  points: number;
}

interface StandingsState {
  drivers: Driver[];
  teams: Team[];
}

const INITIAL_STATE: StandingsState = {
  drivers: [],
  teams: [],
};

export const STANDINGS_STORE = new InjectionToken<StandingsState>(
  'StandingsStore',
  {
    factory: () => INITIAL_STATE,
  }
);

export const StandingsStore = signalStore(
  { providedIn: 'root' },

  withState(() => inject(STANDINGS_STORE)),

  withHooks({
    async onInit(store) {
      const driverService = inject(DriverService);
      const teamService = inject(TeamService);

      driverService.getDrivers().subscribe((res) => {
        const drivers = res.data
          .map((d) => ({
            position: d.championship.position,
            name: d.name,
            team: getTeamDisplayName(d.team.name),
            points: d.championship.points ?? 0,
          }))
          .sort((a, b) => a.position - b.position);

        patchState(store, { drivers });
      });

      teamService.getTeams().subscribe((res) => {
        const teams = res.data
          .map((d) => ({
            position: d.championship.position,
            pilots: d.pilots.map((p: any) => ({ name: p.name })),
            team: getTeamDisplayName(d.name),
            points: d.championship.points ?? 0,
          }))
          .sort((a, b) => a.position - b.position);

        patchState(store, { teams });
      });
    },
  })
);
