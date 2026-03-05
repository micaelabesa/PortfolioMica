// src/app/components/nav/nav.ts
import { Component, inject, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UI } from '../../services/ui';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-nav',
    standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeToggle],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Nav {
  private readonly ui = inject(UI);
  readonly isMenuOpen = signal<boolean>(false);
  readonly isSustainable = computed((): boolean => this.ui.isSustainable());

  toggleMenu(): boolean {
    this.isMenuOpen.update(val => !val);
    return this.isMenuOpen();
  }
}