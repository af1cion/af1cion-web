import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://svtf66kz-3010.brs.devtunnels.ms';
  
  private _http = inject(HttpClient);

  sendCodeMail(email: string) {
    const url = `${this.baseUrl}/identity/send-code-mail`;
    return this._http.post(url, { email });
  }

  checkCode(code: string) {
    const url = `${this.baseUrl}/identity/check-code`;
    return this._http.post(url, { code });
  }

  createAccount(email: string, username: string, password: string) {
    const url = `${this.baseUrl}/identity/create-credential`;
    return this._http.post(url, { email, username, password });
  }

  loginWithCredentials(email: string, password: string) {
    const url = `${this.baseUrl}/identity/login`;
    return this._http.post(url, { email, password });
  }
}
