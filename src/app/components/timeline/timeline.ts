import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UI } from '../../services/ui';

interface Milestone {
  id: number;
  start_year: string;
  end_year: string;
  title: string;
  desc: string;
  link?: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Timeline {
  private readonly ui = inject(UI);

  readonly expandedId = signal<number | null>(null);
  readonly isSustainable = signal(this.ui.isSustainable());

  /**
   * Milestones - Hitos de la trayectoria
   */
  readonly milestones = signal<Milestone[]>([
    { id: 1, start_year: '2015', end_year: '2017', title: 'Arquitectura', desc: 'Formación técnica en diseño y estructuras.' },
    { id: 2, start_year: '2015', end_year: '2021', title: 'AGBC', desc: 'Argentina Green Building Council. Office Coordinator.' },
    { id: 3, 
    start_year: '2020', 
    end_year: '2021', 
    title: 'UnagiStore', 
    desc: 'En plena pandemia cree mi primer emprendimiento.',
    link: 'https://www.instagram.com/unagistoree/' },
    { id: 4, start_year: '2021', end_year: 'Actualidad', title: 'Migración', desc: 'Resiliencia y adaptación en un nuevo entorno.' },
    { id: 5, 
    start_year: '2021', 
    end_year: 'Actualidad', 
    title: 'Forment.ar', 
    desc: 'Creación de mi segundo emprendimiento desarrollando stickers.',
    link: 'https://www.instagram.com/forment.ar' },
    { id: 6, start_year: '2021', end_year: 'Actualidad', title: 'Hostelería', desc: 'Empatía y gestión multicultural en Formentera.' },
    { id: 7, start_year: '2026', end_year: 'Actualidad', title: 'SOFTWARE', desc: 'Desarrollo de sistemas escalables y limpios.' }
  ]);

  /**
   * Toggle para expandir/contraer en móvil
   */
  toggleExpand(id: number): void {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  /**
   * Toggle modo sostenible
   */
  toggleSustainableMode(): boolean {
    return this.ui.toggleSustainableMode();
  }
}
