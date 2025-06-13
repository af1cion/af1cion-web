import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styles: ``
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  handleLogin() {
    this.auth.login();
    this.router.navigate(['/']);
  }
}
