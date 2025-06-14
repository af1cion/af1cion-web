import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '@app/auth/auth.service';
import { Register } from '@app/auth/register/register';
import { ForgotPassword } from '@app/auth/forgot-password/forgot-password';

@Component({
  selector: 'app-login',
  imports: [LucideAngularModule, Register, ForgotPassword],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  public showRegister = signal(false);
  public showForgotPassword = signal(false);
  public isLoading = signal(false);

  private auth = inject(AuthService);
  private router = inject(Router);

  handleLogin() {
    this.isLoading.set(true);

    setTimeout(() => {
      this.auth.login();
      this.isLoading.set(false);
      this.router.navigate(['/']);
    }, 1000);
  }

  handleToggleRegister() {
    if (this.showForgotPassword()) {
      this.showForgotPassword.set(false);
      return;
    }

    this.showRegister.set(!this.showRegister());
  }
}
