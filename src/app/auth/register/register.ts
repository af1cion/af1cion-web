import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-register',
  imports: [NgClass, LucideAngularModule],
  templateUrl: './register.html',
  styles: ``,
})
export class Register {
  public step = signal<'email' | 'verify' | 'complete'>('email');
  public isLoading = signal(false);
  public verification = {
    code: Array.from({ length: 6 }, () => signal('')),
    countdown: signal(30),
    canResend: signal(false),
  };
  public form = signal({
    email: '',
    username: '',
    password: '',
  });
  public isEmailValid = computed(() => {
    const email = this.form().email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  });
  public isCodeValid = computed(() =>
    this.verification.code.every((d) => d().length === 1)
  );
  public isUsernameValid = computed(
    () => this.form().username.trim().length > 0
  );
  public isPasswordValid = computed(
    () => this.form().password.trim().length > 0
  );

  private auth = inject(AuthService);

  handleEmailInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.form.update((f) => ({ ...f, email: value }));
  }

  handleUsernameInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.form.update((f) => ({ ...f, username: value }));
  }

  handlePasswordInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.form.update((f) => ({ ...f, password: value }));
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const currentStep = this.step();

    if (currentStep === 'email') {
      const email = this.form().email.trim();
      this.isLoading.set(true);

      this.auth.sendCodeMail(email).subscribe({
        next: (response) => {
          console.log('Código enviado', response);
          this.startCountdown();
          this.step.set('verify');
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error enviando código', err);
          this.isLoading.set(false);
        },
      });

      return;
    }

    if (currentStep === 'verify') {
      const code = this.verification.code.map((d) => d()).join('');
      this.isLoading.set(true);

      this.auth.checkCode(code).subscribe({
        next: (response) => {
          console.log('Código verificado', response);
          this.step.set('complete');
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error verificando código', err);
          this.isLoading.set(false);
        },
      });

      return;
    }

    if (currentStep === 'complete') {
      const email = this.form().email;
      const code = this.verification.code.map((d) => d()).join('');
      const username = this.form().username;
      const password = this.form().password;

      this.isLoading.set(true);

      this.auth.createAccount(email, username, password).subscribe({
        next: (response) => {
          console.log('Credenciales creadas', response);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error creando credenciales', err);
          this.isLoading.set(false);
        },
      });

      return;
    }
  }

  handleInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/^\d$/.test(value)) {
      this.clearInput(input, index);
      return;
    }

    this.verification.code[index].set(value);
    this.focusInput(index + 1);
  }

  handleBackspace(index: number, event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value === '') {
        this.focusInput(index - 1);
      } else {
        this.clearInput(input, index);
        event.preventDefault();
      }
    }
  }

  handleResend() {
    if (this.verification.canResend()) {
      this.startCountdown();
      // logic to resend the code
    }
  }

  private startCountdown() {
    this.verification.countdown.set(30);
    this.verification.canResend.set(false);

    const interval = setInterval(() => {
      const value = this.verification.countdown();
      if (value <= 1) {
        clearInterval(interval);
        this.verification.countdown.set(0);
        this.verification.canResend.set(true);
      } else {
        this.verification.countdown.set(value - 1);
      }
    }, 1000);
  }

  private focusInput(index: number) {
    const input = document.getElementById(`code-${index}`);
    if (input) input.focus();
  }

  private clearInput(input: HTMLInputElement, index: number) {
    input.value = '';
    this.verification.code[index].set('');
  }
}
