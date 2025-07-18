import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
  signal,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-message-write',
  imports: [LucideAngularModule],
  templateUrl: './message-write.html',
  styles: ``,
})
export class MessageWrite {
  public messageText = input('');

  @Output() messageTextChange = new EventEmitter<string>();
  @Output() sendMessage = new EventEmitter<void>();

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    this.messageTextChange.emit(textarea.value);
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage.emit();
    }
  }

  onSend() {
    this.sendMessage.emit();
  }
}
