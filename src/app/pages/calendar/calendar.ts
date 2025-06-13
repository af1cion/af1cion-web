import { Component, signal } from '@angular/core';
import { Heading, Tabs, MainContent, InfoSidebar } from '@app/components';

@Component({
  selector: 'app-calendar',
  imports: [Heading, Tabs, MainContent, InfoSidebar],
  templateUrl: './calendar.html',
  styles: ``,
})
export class Calendar {
  public activeTab = signal<'primary' | 'secondary'>('primary');
  public isLoading = signal(true);

  public handleTabChange(tab: 'primary' | 'secondary') {
    if (this.activeTab() === tab) return;

    this.activeTab.set(tab);
    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
    }, 700);
  }
}
