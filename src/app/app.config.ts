import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  LucideAngularModule,
  Ellipsis,
  Heart,
  MessageCircle,
  House,
  CalendarDays,
  Globe,
  ScanFace,
  LayoutList,
  User,
  Gamepad2,
  Send,
  Bell,
  Image,
  Smile,
  CaseSensitive,
  ImagePlay,
  Link,
  Search,
  Plus,
  Users,
  LockOpen,
  ChevronRight,
  Gem,
  MousePointer2,
  Cake,
  BadgeCheck,
  ArrowLeft
} from 'lucide-angular';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      LucideAngularModule.pick({
        Ellipsis,
        Heart,
        MessageCircle,
        House,
        CalendarDays,
        Globe,
        ScanFace,
        LayoutList,
        User,
        Gamepad2,
        Send,
        Bell,
        Image,
        Smile,
        CaseSensitive,
        ImagePlay,
        Link,
        Search,
        Plus,
        Users,
        LockOpen,
        ChevronRight,
        Gem,
        MousePointer2,
        Cake,
        BadgeCheck,
        ArrowLeft
      })
    ),
  ],
};
