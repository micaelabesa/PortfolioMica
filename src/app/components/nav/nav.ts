// src/app/components/nav/nav.ts
import { Component, inject, signal, ChangeDetectionStrategy, computed, HostListener, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('navContainer') navContainer!: ElementRef;
  readonly isMenuOpen = signal<boolean>(false);
  readonly isSustainable = computed((): boolean => this.ui.isSustainable());

  toggleMenu(): boolean {
    this.isMenuOpen.update(val => !val);
    return this.isMenuOpen();
  }

  /**
   * Cerrar menú al clickear fuera
   */
    @HostListener('document:click', ['$event'])
    closeMenuOnClickOutside(event: MouseEvent): void {
    // Si el menú está cerrado, no hacer nada
    if (!this.isMenuOpen()) return;

    // Verificar si el click fue dentro del nav
    const navElement = this.navContainer?.nativeElement;
    if (navElement && navElement.contains(event.target as Node)) {
      // Click dentro del nav, no cerrar
      return;
    }

    // Click fuera del nav, cerrar menú
    this.isMenuOpen.set(false);
  }
}