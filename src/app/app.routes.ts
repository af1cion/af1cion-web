import { Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/pages').then((m) => m.Pages),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./pages/calendar/calendar').then((m) => m.Calendar),
      },
      {
        path: 'standings',
        loadComponent: () =>
          import('./pages/standings/standings').then((m) => m.Standings),
      },
      {
        path: 'communities',
        loadComponent: () =>
          import('./pages/communities/communities').then((m) => m.Communities),
      },
      {
        path: 'communities/:community',
        loadComponent: () =>
          import('./pages/communities/community-details/community-details').then(
            (m) => m.CommunityDetails
          ),
      },
      {
        path: 'news',
        loadComponent: () => import('./pages/news/news').then((m) => m.News),
      },
      {
        path: 'games',
        loadComponent: () => import('./pages/games/games').then((m) => m.Games),
      },
      {
        path: 'notifications',
        loadComponent: () => import('./pages/notifications/notifications').then((m) => m.Notifications),
      },
      {
        path: 'messages',
        loadComponent: () => import('./pages/messages/messages').then((m) => m.Messages),
      },
    ]
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('./auth/login/login').then((m) => m.Login),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
