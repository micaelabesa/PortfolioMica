import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-word-carousel',
  templateUrl: './word-carousel.component.html',
  styleUrl: './word-carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordCarouselComponent {
  words = input<string[]>(['inspiration', 'innovation', 'creativity']);
  wordInterval = input<number>(3000);
}