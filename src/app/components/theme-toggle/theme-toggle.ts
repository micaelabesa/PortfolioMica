// src/app/components/theme-toggle/theme-toggle.ts
import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { UI } from '../../services/ui';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.sustainable-ui]': 'isSustainable()'
  }
})
export class ThemeToggle {
  private readonly uiService = inject(UI);

  // Declaración del signal derivado
  readonly isSustainable = computed((): boolean => this.uiService.isSustainable());

  /**
   * Ejecuta el cambio de modo y retorna el estado final.
   */
  toggle(): boolean {
    return this.uiService.toggleSustainableMode();
  }
}