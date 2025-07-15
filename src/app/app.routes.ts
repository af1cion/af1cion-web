import { Routes } from '@angular/router';
import { AuthGuard, LoginGuard } from '@app/domains/guards';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadComponent: () => import('./auth/login/login').then((m) => m.Login),
  },
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
        path: 'community',
        loadComponent: () =>
          import(
            './pages/communities/community-details/community-details'
          ).then((m) => m.CommunityDetails),
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
        path: 'messages',
        loadComponent: () =>
          import('./pages/messages/messages').then((m) => m.Messages),
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./dashboard/dashboard').then((m) => m.Dashboard),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./dashboard/home/home').then((m) => m.Home),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./dashboard/users/users').then((m) => m.Users),
      },
      {
        path: 'standings',
        loadComponent: () =>
          import('./dashboard/standings/standings').then((m) => m.Standings),
      },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
