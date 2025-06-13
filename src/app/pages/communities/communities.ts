import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import {
  Heading,
  Category,
  CommunityCard,
  Tabs,
  MainContent,
  InfoSidebar,
} from '@app/components';

@Component({
  selector: 'app-communities',
  imports: [
    LucideAngularModule,
    RouterModule,
    Heading,
    Category,
    CommunityCard,
    Tabs,
    MainContent,
    InfoSidebar,
  ],
  templateUrl: './communities.html',
  styles: ``,
})
export class Communities {
  public activeTab = signal<'primary' | 'secondary'>('primary');
  public isLoading = signal(true);

  public communities = [
    {
      name: 'r/España',
      description: '185k miembros',
      slug: 'espana',
    },
    {
      name: 'r/Brasil',
      description: '185k miembros',
      slug: 'brasil',
    },
    {
      name: 'r/Italia',
      description: '185k miembros',
      slug: 'italia',
    },
    {
      name: 'r/Miami',
      description: '185k miembros',
      slug: 'miami',
    },
    {
      name: 'r/México',
      description: '185k miembros',
      slug: 'mexico',
    },
    {
      name: 'r/Canadá',
      description: '185k miembros',
      slug: 'canada',
    },
  ];

  constructor() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 600);
  }

  public handleTabChange(tab: 'primary' | 'secondary') {
    if (this.activeTab() === tab) return;

    this.activeTab.set(tab);
    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
    }, 600);
  }
}
