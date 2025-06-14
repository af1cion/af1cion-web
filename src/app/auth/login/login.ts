import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Register } from '@app/auth/register/register';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [LucideAngularModule, Register],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  public showRegister = signal(false);
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
    this.showRegister.set(!this.showRegister());
  }
}
