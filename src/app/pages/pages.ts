import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { Header, NavSidebar } from '@app/components';

@Component({
  selector: 'app-pages',
  imports: [Header, NavSidebar, RouterModule],
  templateUrl: './pages.html',
  styles: ``,
})
export class Pages {
  private readonly _router = inject(Router);

  get shouldShowSidebar(): boolean {
    return !this._router.url.includes('/messages');
  }
}
