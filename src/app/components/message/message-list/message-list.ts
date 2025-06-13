import { Component, input } from '@angular/core';

@Component({
  selector: 'app-message-list',
  imports: [],
  templateUrl: './message-list.html',
  styles: ``
})
export class MessageList {
  public messagesList = input<any[]>([]);
}
