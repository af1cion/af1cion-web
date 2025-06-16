import { Component, HostListener, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './header.html',
  styles: '',
})
export class Header {
  public isNotificationOpen = signal(false);
  public isProfileOpen = signal(false);

  toggleNotification() {
    this.isNotificationOpen.set(!this.isNotificationOpen());
    this.isProfileOpen.set(false);
  }

  toggleProfile() {
    this.isProfileOpen.set(!this.isProfileOpen());
    this.isNotificationOpen.set(false);
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
