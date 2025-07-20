import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { format } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { NgClass } from '@angular/common';

import {
  Heading,
  MainContent,
  MessageWrite,
  MessageList,
} from '@app/components';
import {
  popularEmojis,
  animalsNatureEmojis,
  foodDrinkEmojis,
  activitiesEmojis,
  travelPlacesEmojis,
  objectsEmojis,
  symbolsEmojis,
  flagsEmojis,
} from '@app/utils';
import { ChatSocketService } from '@app/domains/services';

type Message = {
  id?: string;
  fromMe: boolean;
  createdAt: Date;
  texts: string[];
  reaction?: string;
  reactionByMe?: boolean;
};

@Component({
  selector: 'app-messages',
  imports: [
    NgClass,
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
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;

  public messageText = '';
  public selectedUser: any = null;
  public openSmileIndex: string | null = null;
  public popularEmojis = popularEmojis;
  public animalsNatureEmojis = animalsNatureEmojis;
  public foodDrinkEmojis = foodDrinkEmojis;
  public activitiesEmojis = activitiesEmojis;
  public travelPlacesEmojis = travelPlacesEmojis;
  public objectsEmojis = objectsEmojis;
  public symbolsEmojis = symbolsEmojis;
  public flagsEmojis = flagsEmojis;

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

  public allMessages: Record<string, Message[]> = {};
  public roomId: string | null = null;

  private socket = inject(ChatSocketService);

  get messages(): Message[] {
    return this.roomId && this.allMessages[this.roomId]
      ? this.allMessages[this.roomId]
      : [];
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

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatContainer && this.chatContainer.nativeElement) {
        const el = this.chatContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    }, 100);
  }

  getTimeOnly(date: Date | string): string {
    return format(new Date(date), 'HH:mm');
  }

  selectUser(userId: string) {
    this.selectedUser = this.users.find((u) => u.id === userId);
    this.roomId = [this.currentUserId, userId].sort().join('_');
    this.socket.joinRoom(this.currentUserId, userId);

    if (!this.roomId) return;

    if (!this.allMessages[this.roomId]) this.allMessages[this.roomId] = [];

    this.socket.getMessages(this.roomId).subscribe({
      next: (resp) => {
        const mensajesBackend = (resp.data || []).sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        this.allMessages[this.roomId!] = mensajesBackend.map(
          (msg: any, idx: number) => ({
            id: msg.id ?? 'msg_' + idx + '_' + Date.now(),
            fromMe: msg.senderId === this.currentUserId,
            createdAt: new Date(msg.createdAt),
            texts: [msg.content],
            time: format(new Date(msg.createdAt), 'HH:mm'),
          })
        );

        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error cargando mensajes del chat:', err);
      },
    });
  }

  isSmileOpen(id: string): boolean {
    return this.openSmileIndex === id;
  }

  addEmoji(emoji: string) {
    if (!this.openSmileIndex) return;
    const [msgId] = this.openSmileIndex.split('_');
    const mensaje = this.messages.find((m) => m.id === msgId);

    if (mensaje) {
      mensaje.reaction = emoji;
      mensaje.reactionByMe = true;
      this.scrollToBottom();
    }
    this.openSmileIndex = null;
  }

  removeReaction(message: Message) {
    message.reaction = undefined;
    message.reactionByMe = false;
  }

  toggleSmilePicker(id: string, event: MouseEvent) {
    console.log(id);
    event.stopPropagation();
    this.openSmileIndex = this.openSmileIndex === id ? null : id;
  }

  handleSendMessage() {
    const text = this.messageText.trim();
    if (!text || !this.selectedUser || !this.roomId) return;
    this.socket.sendMessage(text, this.currentUserId, this.selectedUser.id);
    this.messageText = '';
    this.scrollToBottom();
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.openSmileIndex = null;
  }
}
