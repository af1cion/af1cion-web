import {
  Component,
  EventEmitter,
  HostListener,
  input,
  Output,
  signal,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
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

@Component({
  selector: 'app-message-write',
  imports: [LucideAngularModule],
  templateUrl: './message-write.html',
  styles: ``,
})
export class MessageWrite {
  public messageText = input('');
  public isSmileOpen = signal(false);

  public popularEmojis = popularEmojis;
  public animalsNatureEmojis = animalsNatureEmojis;
  public foodDrinkEmojis = foodDrinkEmojis;
  public activitiesEmojis = activitiesEmojis;
  public travelPlacesEmojis = travelPlacesEmojis;
  public objectsEmojis = objectsEmojis;
  public symbolsEmojis = symbolsEmojis;
  public flagsEmojis = flagsEmojis;

  @Output() messageTextChange = new EventEmitter<string>();
  @Output() sendMessage = new EventEmitter<void>();

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    this.messageTextChange.emit(textarea.value);
  }

  toggleSmile() {
    this.isSmileOpen.set(!this.isSmileOpen());
  }

  addEmoji(emoji: string) {
    const newValue = (this.messageText() || '') + emoji;
    this.messageTextChange.emit(newValue);
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const smileEl = document.querySelector('.smile-dropdown');

    if (smileEl && !smileEl.contains(event.target as Node)) {
      this.isSmileOpen.set(false);
    }
  }
}
