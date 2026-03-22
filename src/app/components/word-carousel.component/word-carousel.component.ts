import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';

@Component({
  selector: 'app-word-carousel',
  templateUrl: './word-carousel.component.html',
  styleUrl: './word-carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordCarouselComponent {
  words = input<string[]>(['DESARROLLADORA_FULL_STACK', 'DISPONIBLE_2026']);
  wordInterval = input<number>(6000);
  currentIndex = signal(0);

  constructor() {
    setInterval(() => {
      this.currentIndex.update(i => (i + 1) % this.words().length);
    }, this.wordInterval());
  }

  isWordExiting(index: number): boolean {
    return index === this.getPreviousIndex();
  }

  isWordEntering(index: number): boolean {
    return index === this.currentIndex();
  }

  private getPreviousIndex(): number {
    const prevIndex = this.currentIndex() - 1;
    return prevIndex < 0 ? this.words().length - 1 : prevIndex;
  }
}