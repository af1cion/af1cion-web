import { Component } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { LucideAngularModule } from 'lucide-angular';

import {
  Heading,
  MainContent,
  MessageWrite,
  MessageList,
} from '@app/components';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [
    NgClass,
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

  public messages = [
    {
      fromMe: false,
      createdAt: new Date('2025-06-06T10:00:00'),
      texts: ['Hi, how are you?', 'Are you free today?'],
    },
    {
      fromMe: true,
      createdAt: new Date('2025-06-06T10:01:00'),
      texts: ["I'm good, and you?", 'Yes, free all day!'],
    },
    {
      fromMe: false,
      createdAt: new Date('2025-06-06T10:03:00'),
      texts: ['Wanna go to the GP this weekend?'],
    },
  ];

  getRelativeTime(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  }
}
