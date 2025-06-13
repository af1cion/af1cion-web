import { Component, computed, input, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-message-write',
  imports: [LucideAngularModule],
  templateUrl: './message-write.html',
  styles: ``
})
export class MessageWrite {
  public messageText = signal('');

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    this.messageText.set(textarea.value);
  }
}
