import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface Community {
  name: string;
  description: string;
  slug: string;
}

@Component({
  selector: 'app-community-card',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './community-card.html',
  styles: ``
})
export class CommunityCard {
  public community = input<Community>();
  public index = input();
}
