import { Component, computed, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-forgot-password',
  imports: [LucideAngularModule],
  templateUrl: './forgot-password.html',
  styles: ``,
})
export class ForgotPassword {
  public isLoading = signal(false);
  public form = signal({
    email: '',
  });
  public isEmailValid = computed(() => {
    const email = this.form().email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  });

  handleEmailInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.form.update((f) => ({ ...f, email: value }));
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);

    return;
  }
}
