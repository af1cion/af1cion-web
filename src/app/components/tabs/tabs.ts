import { NgClass } from '@angular/common';
import { Component, EventEmitter, input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [NgClass],
  templateUrl: './tabs.html',
  styles: ``,
})
export class Tabs {
  public labelPrimary = input('Following');
  public labelSecondary = input('Followers');
  public activeTab = signal<'primary' | 'secondary'>('primary');

  @Output() tabChanged = new EventEmitter<'primary' | 'secondary'>();

  selectTab(tab: 'primary' | 'secondary') {
    this.activeTab.set(tab);
    this.tabChanged.emit(tab);
  }
}
