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
    { id: 1, start_year: '2015', end_year: '2017', title: 'Arquitectura', desc: 'Formación técnica en diseño y estructuras.' },
    { id: 2, start_year: '2015', end_year: '2021', title: 'AGBC', desc: 'Argentina Green Building Council. Office Coordinator.' },
    { id: 3, start_year: '2021', end_year: 'Actualidad', title: 'Migración', desc: 'Resiliencia y adaptación en un nuevo entorno.' },
    { id: 4, start_year: '2021', end_year: 'Actualidad', title: 'Hostelería', desc: 'Empatía y gestión multicultural en Formentera.' },
    { id: 5, start_year: '2026', end_year: 'Actualidad', title: 'SOFTWARE', desc: 'Desarrollo de sistemas escalables y limpios.' }
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