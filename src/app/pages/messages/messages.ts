import { Component, inject, OnInit } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
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
  public messagesList = [
    {
      id: 'a6174657-76c5-492e-a591-da9ce16d8809',
      name: 'Nicolas Lobos',
      username: 'nicolas_lobos',
      message: 'Lorem ipsum dolor sit amet 😁!',
    },
    {
      id: 'edb6c246-2ca1-4117-bbfb-fd94ea026555',
      name: 'Sergio Rojas',
      username: 'sergiodev',
      message: 'Lorem ipsum',
    },
  ];

  public messageText = '';
  public selectedUser: any = null;
  public users = [
    { id: 'edb6c246-2ca1-4117-bbfb-fd94ea026555', name: 'Sergio Rojas' },
    { id: '6f0d29d5-3916-4d1a-849a-bae88c1d98a0', name: 'Nicolas Lobos' },
  ];

  private token = localStorage.getItem('access_token');
  private userPayload = this.token ? this.decodeJwtPayload(this.token) : null;
  private currentUserId = this.userPayload ? this.userPayload.id : '';

  private socket = inject(ChatSocketService);
  public roomId: string | null = null;

  // Acá va el historial de todos los chats, clave = roomId
  public allMessages: Record<string, Message[]> = {};

  // Getter: muestra solo los mensajes de la sala actual
  get messages(): Message[] {
    return this.roomId && this.allMessages[this.roomId]
      ? this.allMessages[this.roomId]
      : [];
  }

  getRelativeTime(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true, locale: enUS });
  }

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    console.log(this.decodeJwtPayload(token!));
    // Puedes inicializar el chat con el primer usuario si quieres
    // this.selectUser('a6174657-76c5-492e-a591-da9ce16d8809');

    this.socket.onMessage().subscribe((msg) => {
      // Determina la sala correcta
      const otherUserId = msg.from === this.currentUserId ? msg.to : msg.from;
      const roomId = [this.currentUserId, otherUserId].sort().join('_');
      if (!this.allMessages[roomId]) this.allMessages[roomId] = [];

      const isMine = msg.from === this.currentUserId;

      this.allMessages[roomId].push({
        fromMe: isMine,
        createdAt: new Date(msg.timestamp),
        texts: [msg.content],
      });
    });
  }

  selectUser(userId: string) {
    console.log('Mi id:', this.currentUserId, 'Chat con:', userId);

    this.selectedUser = this.users.find((u) => u.id === userId);
    this.roomId = [this.currentUserId, userId].sort().join('_');
    this.socket.joinRoom(this.currentUserId, userId);

    if (!this.roomId) return;

    if (!this.allMessages[this.roomId]) this.allMessages[this.roomId] = [];

    console.log(this.roomId);

    this.socket.getMessages(this.roomId).subscribe({
      next: (resp) => {
        console.log('Mensajes previos:', resp);
        const mensajesBackend = resp.data || [];

        // Transforma el array de mensajes al formato de tu UI
        this.allMessages[this.roomId!] = mensajesBackend.map((msg: any) => ({
          fromMe: msg.senderId === this.currentUserId,
          createdAt: new Date(msg.createdAt),
          texts: [msg.content],
        }));
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
