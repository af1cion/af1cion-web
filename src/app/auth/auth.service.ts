import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSignal = signal(false);

  isLoggedIn() {
    return this.isAuthenticatedSignal();
  }

  login() {
    this.isAuthenticatedSignal.set(true);
  }

  logout() {
    this.isAuthenticatedSignal.set(false);
  }
}
