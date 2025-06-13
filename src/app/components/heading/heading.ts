import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-heading',
  imports: [NgClass, LucideAngularModule, RouterModule],
  templateUrl: './heading.html',
  styles: ``
})
export class Heading {
  public heading = input();
  public showSearch = input();
  public showAddCommunity = input();
  public showOptions = input();
  public showBack = input();
}
