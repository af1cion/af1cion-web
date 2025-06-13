import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-post-header',
  imports: [LucideAngularModule],
  templateUrl: './post-header.html',
  styles: '',
})
export class PostHeader {
  public username = 'nicolas_lobos';
}
