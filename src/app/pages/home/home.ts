import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import {
  PostWrite,
  PostCard,
  InfoSidebar,
  MainContent,
  Carousel,
} from '@app/components';

@Component({
  selector: 'app-home',
  imports: [
    LucideAngularModule,
    PostWrite,
    PostCard,
    InfoSidebar,
    MainContent,
    Carousel,
  ],
  templateUrl: './home.html',
  styles: ``,
})
export class Home {}
