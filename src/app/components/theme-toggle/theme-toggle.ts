import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { UI } from '../../services/ui';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-label]': '"Toggle theme"',
    '[attr.role]': '"button"',
    '[attr.tabindex]': '0',
    '(click)': 'toggle()',
    '(keydown.enter)': 'toggle()',
    '(keydown.space)': 'toggle()'
  }
})
export class ThemeToggle {
  private readonly ui = inject(UI);

  // Declaración del signal derivado
  readonly isSustainable = computed(() => this.ui.isSustainable());
  readonly accentColor = computed(() => this.ui.accentColor);

  /**
   * Ejecuta el cambio de modo y retorna el estado final.
   */
  toggle(): void {
    this.ui.toggleSustainableMode();
  }
}