import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-category',
  imports: [NgClass],
  templateUrl: './category.html',
  styles: ``
})
export class Category {
  public category = input();
  public isSelected = input(false);
}
