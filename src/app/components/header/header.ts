import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './header.html',
  styles: ''
})
export class Header {

}
