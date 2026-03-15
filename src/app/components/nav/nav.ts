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

  
  @HostListener('document:click', ['$event'])@HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
  if (!this.isMenuOpen()) return;  // Menú cerrado, ignorar

  const navElement = this.navContainer?.nativeElement;
  
  // Si click fue dentro del nav, no cerrar
  if (navElement && navElement.contains(event.target as Node)) {
    return;
  }

  // Click fuera del nav - CERRAR
  this.closeMenu();
}

toggleMenu(): void {
  this.isMenuOpen.update(val => !val);
}

closeMenu(): void {
  this.isMenuOpen.set(false);
}
}