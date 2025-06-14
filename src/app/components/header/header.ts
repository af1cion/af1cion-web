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
  public isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdown = document.querySelector('.notification-dropdown');
    const bell = document.querySelector('.notification-bell');

    if (
      dropdown &&
      !dropdown.contains(event.target as Node) &&
      bell &&
      !bell.contains(event.target as Node)
    ) {
      this.isDropdownOpen.set(false);
    }
  }
}
