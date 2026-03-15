import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UI } from '../../services/ui';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.sustainable-mode]': 'isSustainable()'
  }
})
export class Footer {
  private readonly ui = inject(UI);

  readonly isSustainable = computed(() => this.ui.isSustainable());
  readonly version = () => '2.0.0';
  readonly buildDate = () => new Date().toISOString().split('T')[0];
  readonly currentYear = () => new Date().getFullYear();
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}