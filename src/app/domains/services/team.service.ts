import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TeamWithPilotsResponse } from '../models/team.model';
import { TEAMS_MOCK } from '../../../../public/data-mock/teams.mock';

@Injectable({ providedIn: 'root' })
export class TeamService {

  getTeams(): Observable<TeamWithPilotsResponse> {
    return of(TEAMS_MOCK);
  }
}
