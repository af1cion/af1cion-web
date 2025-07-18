import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { format } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

import {
  Heading,
  MainContent,
  MessageWrite,
  MessageList,
} from '@app/components';
import { NgClass, NgFor } from '@angular/common';
import { ChatSocketService } from '@app/domains/services';

type Message = {
  fromMe: boolean;
  createdAt: Date;
  texts: string[];
};

@Component({
  selector: 'app-messages',
  imports: [
    NgClass,
    NgFor,
    MainContent,
    Heading,
    MessageWrite,
    MessageList,
    FormsModule,
    LucideAngularModule,
  ],
  templateUrl: './messages.html',
  styles: ``,
})
export class Messages implements OnInit {
  public messageText = '';
  public selectedUser: any = null;
  public users = [
    {
      id: '6f0d29d5-3916-4d1a-849a-bae88c1d98a0',
      name: 'Nicolas Lobos',
      username: 'nicolas_lobos',
      message: 'Lorem ipsum',
    },
    {
      id: 'edb6c246-2ca1-4117-bbfb-fd94ea026555',
      name: 'Sergio Rojas',
      username: 'sergiodev',
      message: 'Lorem ipsum',
    },
  ];

  private token = localStorage.getItem('access_token');
  private userPayload = this.token ? this.decodeJwtPayload(this.token) : null;
  private currentUserId = this.userPayload ? this.userPayload.id : '';

  private socket = inject(ChatSocketService);
  public roomId: string | null = null;

  public allMessages: Record<string, Message[]> = {};

  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;

  get messages(): Message[] {
    return this.roomId && this.allMessages[this.roomId]
      ? this.allMessages[this.roomId]
      : [];
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer && this.chatContainer.nativeElement) {
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      }
    }, 0);
  }

  getTimeOnly(date: Date | string): string {
    return format(new Date(date), 'HH:mm');
  }

  ngOnInit() {
    this.socket.onMessage().subscribe((msg) => {
      const otherUserId = msg.from === this.currentUserId ? msg.to : msg.from;
      const roomId = [this.currentUserId, otherUserId].sort().join('_');
      if (!this.allMessages[roomId]) this.allMessages[roomId] = [];

      const isMine = msg.from === this.currentUserId;

      this.allMessages[roomId].push({
        fromMe: isMine,
        createdAt: new Date(msg.timestamp),
        texts: [msg.content],
      });

      this.scrollToBottom();
    });
  }

  selectUser(userId: string) {
    this.selectedUser = this.users.find((u) => u.id === userId);
    this.roomId = [this.currentUserId, userId].sort().join('_');
    this.socket.joinRoom(this.currentUserId, userId);

    if (!this.roomId) return;

    if (!this.allMessages[this.roomId]) this.allMessages[this.roomId] = [];

    console.log(this.roomId);

    this.socket.getMessages(this.roomId).subscribe({
      next: (resp) => {
        console.log('Mensajes previos:', resp);
        const mensajesBackend = (resp.data || []).sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        this.allMessages[this.roomId!] = mensajesBackend.map((msg: any) => ({
          fromMe: msg.senderId === this.currentUserId,
          createdAt: new Date(msg.createdAt),
          texts: [msg.content],
          time: format(new Date(msg.createdAt), 'HH:mm')
        }));

        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error cargando mensajes del chat:', err);
      },
    });
  }

  handleSendMessage() {
    const text = this.messageText.trim();
    if (!text || !this.selectedUser || !this.roomId) return;
    this.socket.sendMessage(text, this.currentUserId, this.selectedUser.id);
    this.messageText = '';
  }

  decodeJwtPayload(token: string): any {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = atob(payloadBase64);
      return JSON.parse(decodedPayload).payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
