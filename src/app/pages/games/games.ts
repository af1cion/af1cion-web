import { Component } from '@angular/core';
import { Heading, Category, MainContent, InfoSidebar } from '@app/components';

@Component({
  selector: 'app-games',
  imports: [Heading, Category, MainContent, InfoSidebar],
  templateUrl: './games.html',
  styles: ``,
})
export class Games {
  public showGame: boolean = false;

  handleGame() {
    this.showGame = !this.showGame;
  }
}
