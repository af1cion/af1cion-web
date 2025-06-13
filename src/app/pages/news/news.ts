import { Component } from '@angular/core';

import { Heading, MainContent, InfoSidebar } from '@app/components';

@Component({
  selector: 'app-news',
  imports: [Heading, MainContent, InfoSidebar],
  templateUrl: './news.html',
  styles: ``,
})
export class News {}
