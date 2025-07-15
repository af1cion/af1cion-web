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

  public form = signal({
    email: '',
    password: '',
  });

  private auth = inject(AuthService);
  private router = inject(Router);

  handleEmailInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.form.update((f) => ({ ...f, email: value }));
  }

  handlePasswordInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.form.update((f) => ({ ...f, password: value }));
  }

  handleLogin() {
    this.isLoading.set(true);

    const email = this.form().email.trim();
    const password = this.form().password.trim();

    this.auth.loginWithCredentials(email, password).subscribe({
      next: (response: any) => {
        localStorage.setItem('access_token', response.data);

        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error login', err);
        this.isLoading.set(false);
      },
    });
  }

  handleToggleRegister() {
    if (this.showForgotPassword()) {
      this.showForgotPassword.set(false);
      return;
    }

    this.showRegister.set(!this.showRegister());
  }
}
