import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-nav-sidebar',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './nav-sidebar.html',
  styles: '',
})
export class NavSidebar {}
