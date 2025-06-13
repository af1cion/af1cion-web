import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import {
  Heading,
  MainContent,
  MessageWrite,
  MessageList,
} from '@app/components';

@Component({
  selector: 'app-messages',
  imports: [
    MainContent,
    Heading,
    MessageWrite,
    MessageList,
    LucideAngularModule,
  ],
  templateUrl: './messages.html',
  styles: ``,
})
export class Messages {
  public messagesList = [
    {
      name: 'Nicolas Lobos',
      username: 'nicolas_lobos',
      message: 'Lorem ipsum dolor sit amet 😁!',
    },
    {
      name: 'Sergio Rojas',
      username: 'sergiodev',
      message: 'Lorem ipsum',
    },
  ];
}
