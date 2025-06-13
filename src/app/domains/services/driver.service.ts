import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DriverResponse } from '../models/driver.model';
import { DRIVERS_MOCK } from '../../../../public/data-mock/drivers.mock';

@Injectable({ providedIn: 'root' })
export class DriverService {

  getDrivers(): Observable<DriverResponse> {
    return of(DRIVERS_MOCK);
  }
}
