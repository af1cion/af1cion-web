import { io, Socket } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://svtf66kz-3010.brs.devtunnels.ms/chat');
  }

  joinRoom(senderId: string, receiverId: string) {
    this.socket.emit('join-room', {
      senderId,
      receiverId,
    });
  }

  sendMessage(message: string, senderId: string, receiverId: string) {
    this.socket.emit('message', {
      senderId,
      receiverId,
      content: message,
    });
  }

  onMessage(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('send-to-destiny', (data) => {
        subscriber.next(data);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
