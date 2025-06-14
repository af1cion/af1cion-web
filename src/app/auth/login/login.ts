import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Register } from '@app/auth/register/register';

@Component({
  selector: 'app-login',
  imports: [Register],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  public showRegister = signal(false);

  private auth = inject(AuthService);
  private router = inject(Router);

  handleLogin() {
    this.auth.login();
    this.router.navigate(['/']);
  }

  handleToggleRegister() {
    this.showRegister.set(!this.showRegister());
  }
}
