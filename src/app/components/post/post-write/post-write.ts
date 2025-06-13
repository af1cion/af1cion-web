import { Component, computed, input, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-post-write',
  imports: [LucideAngularModule],
  templateUrl: './post-write.html',
  styles: ``,
})
export class PostWrite {
  public showInput = input(false);

  public readonly maxLength = 250;
  public postText = signal('');
  public remainingChars = computed(() => this.maxLength - this.postText().length);
  public isNearLimit = computed(() => this.remainingChars() <= 20);

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    this.postText.set(textarea.value);
  }
}
