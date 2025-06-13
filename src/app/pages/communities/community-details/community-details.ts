import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { MainContent, PostWrite, InfoSidebar, PostCard } from '@app/components';

@Component({
  selector: 'app-community-details',
  imports: [MainContent, PostWrite, InfoSidebar, PostCard, LucideAngularModule],
  templateUrl: './community-details.html',
  styles: ``,
})
export class CommunityDetails {}
