import { NgClass } from '@angular/common';
import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

interface Message {
  id: string;
  name: string;
  username: string;
  message: string;
}

@Component({
  selector: 'app-message-list',
  imports: [NgClass],
  templateUrl: './message-list.html',
  styles: ``,
})
export class MessageList implements OnInit {
  public messagesList = input<Message[]>();
  public selectedId: string | null = null;

  @Output() chatSelect = new EventEmitter<string>();

  ngOnInit() {
    const chats = this.messagesList();

    if (chats && chats.length > 0) {
      this.selectedId = chats[0].id;
      this.chatSelect.emit(this.selectedId)
    }
  }


  onSelect(id: string) {
    this.selectedId = id;
    this.chatSelect.emit(id);
  }
}
