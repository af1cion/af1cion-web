import { Component, inject, signal } from '@angular/core';
import { DecimalPipe, NgClass } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import { StandingsStore } from '@app/domains';
import { Heading, InfoSidebar, MainContent, Tabs } from '@app/components';

interface Driver {
  position: number;
  name: string;
  team: string;
  points: number;
}

interface Team {
  position: number;
  pilots: { name: string }[];
  team: string;
  points: number;
}

const EXCLUDED = ['Jr', 'Sr'];

@Component({
  selector: 'app-standings',
  imports: [
    DecimalPipe,
    LucideAngularModule,
    Heading,
    Tabs,
    NgClass,
    MainContent,
    InfoSidebar,
  ],
  templateUrl: './standings.html',
  styles: ``,
})
export class Standings {
  public activeTab = signal<'primary' | 'secondary'>('primary');
  public isLoading = signal(true);

  private readonly store = inject(StandingsStore);

  public readonly drivers = this.store.drivers;
  public readonly teams = this.store.teams;

  constructor() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 600);
  }

  getPilotLastNames(pilots: { name: string }[]): string {
    return pilots
      .slice(0, 2)
      .map((pilot) => {
        const parts = pilot.name.trim().split(' ');
        let last = parts[parts.length - 1];

        if (EXCLUDED.includes(last) && parts.length > 1) {
          last = parts[parts.length - 2];
        }

        return last;
      })
      .join(' / ');
  }

  getTeamColor(team: string): string {
    switch (team) {
      case 'McLaren':
        return 'text-[#FF8000]';
      case 'Red Bull':
        return 'text-[#3671C6]';
      case 'Mercedes':
        return 'text-[#27F4D2]';
      case 'Ferrari':
        return 'text-[#E8002D]';
      case 'Williams':
        return 'text-[#64C4FF]';
      case 'Aston Martin':
        return 'text-[#229971]';
      case 'Alpine':
        return 'text-[#FF87BC]';
      case 'Racing Bulls':
        return 'text-[#6692FF]';
      case 'Kick Sauber':
        return 'text-[#52E252]';
      case 'Haas':
        return 'text-[#B6BABD]';
      default:
        return 'text-[#777777]';
    }
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
