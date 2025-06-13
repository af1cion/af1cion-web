import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-carousel',
  imports: [LucideAngularModule],
  templateUrl: './carousel.html',
  styles: ``,
})
export class Carousel {
  public news = [
    {
      image: '/news-mock/news_1.webp',
      title: 'Ferrari prepara mejoras clave para Baréin',
      font: 'gpfans.com',
    },
    {
      image: '/news-mock/news_2.webp',
      title: 'Norris pide calma tras inicio de McLaren',
      font: 'formula1.com',
    },
    {
      image: '/news-mock/news_3.webp',
      title: 'Mercedes es el segundo mejor, según Russell',
      font: 'f1l.com',
    },
    {
      image: '/news-mock/news_4.webp',
      title: 'FIA stance on Checo angers Red Bull',
      font: 'gpfans.com',
    }
  ];
}
