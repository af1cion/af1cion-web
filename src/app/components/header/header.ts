import { NgClass } from '@angular/common';
import { Component, HostListener, inject, input, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterModule, NgClass],
  templateUrl: './header.html',
  styles: '',
})
export class Header {
  public isNotificationOpen = signal(false);
  public isProfileOpen = signal(false);
  
  public isDashboard = input(false);

  private router = inject(Router);

  toggleNotification() {
    this.isNotificationOpen.set(!this.isNotificationOpen());
    this.isProfileOpen.set(false);
  }

  toggleProfile() {
    this.isProfileOpen.set(!this.isProfileOpen());
    this.isNotificationOpen.set(false);
  }

  handleLogout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const notifEl = document.querySelector('.notification-dropdown');
    const profileEl = document.querySelector('.profile-dropdown');

    if (notifEl && !notifEl.contains(event.target as Node)) {
      this.isNotificationOpen.set(false);
    }

    if (profileEl && !profileEl.contains(event.target as Node)) {
      this.isProfileOpen.set(false);
    }
  }
}
