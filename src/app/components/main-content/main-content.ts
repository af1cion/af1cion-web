import { Component, input } from '@angular/core';

@Component({
  selector: 'app-main-content',
  imports: [],
  templateUrl: './main-content.html',
  styles: ``
})
export class MainContent {
  public showMessages = input(false);
}
