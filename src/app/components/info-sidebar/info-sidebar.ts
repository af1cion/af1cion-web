import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-info-sidebar',
  imports: [LucideAngularModule],
  templateUrl: './info-sidebar.html',
  styles: '',
})
export class InfoSidebar {
  public showPoints = input(false);
  public showInvite = input(false);
  public showFollow = input(false);
  public showDescriptionCommunity = input(false);

  public users = [
    {
      name: 'Nicolas Lobos',
      username: 'nicolas_lobos',
    },
    {
      name: 'Sergio Rojas',
      username: 'sergiodev',
    },
    {
      name: 'Mateo Encina',
      username: 'mateoencina91',
    },
  ];
}
