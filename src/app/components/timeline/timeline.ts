import { Component, inject, ChangeDetectionStrategy, signal, AfterViewInit, ElementRef } from '@angular/core';
import { UI } from '../../services/ui';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Timeline implements AfterViewInit {
  private readonly ui = inject(UI);
  private readonly el = inject(ElementRef);

  readonly expandedId = signal<number | null>(null);

  readonly milestones = signal([
    { id: 1, year: '2015', title: 'ARQUITECTURA', desc: 'Formación técnica en diseño y estructuras.' },
    { id: 2, year: '2019', title: 'MIGRACIÓN', desc: 'Resiliencia y adaptación en un nuevo entorno.' },
    { id: 3, year: '2023', title: 'HOSTELERÍA', desc: 'Empatía y gestión multicultural en Formentera.' },
    { id: 4, year: '2026', title: 'SOFTWARE', desc: 'Desarrollo de sistemas escalables y limpios.' },
    { id: 5, year: '2028', title: 'SOSTENIBILIDAD', desc: 'Compromiso con el diseño sostenible y ético.' }
  ]);

  ngAfterViewInit(): boolean {
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.2 });

  const cards = this.el.nativeElement.querySelectorAll('.milestone-card');
  cards.forEach((card: HTMLElement) => observer.observe(card));
  
  return true;
  }

  isSustainable(): boolean {
    return this.ui.isSustainable();
  }

toggleExpand(id: number): void {
    // Si haces clic en la que ya está abierta, se cierra; si no, abre la nueva
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  
}