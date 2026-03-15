import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { UI } from '../../services/ui';
import { Timeline } from '../../components/timeline/timeline';

@Component({
  selector: 'app-cimientos',
  imports: [NgOptimizedImage, Timeline],
  templateUrl: './cimientos.html',
  styleUrl: './cimientos.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cimientos {
  private readonly ui = inject(UI);

  // Datos que representan tu trayectoria
  readonly milestones = signal([
    { year: '2019', event: 'Migración Argentina > España', detail: 'Resiliencia y resolución a los 24 años.' },
    { year: '2021', event: 'Sostenibilidad en AGBC', detail: 'Consciencia sobre el impacto y la eficiencia.' },
    { year: '2023', event: 'Hostelería en Formentera', detail: 'Empatía radical y gestión de usuarios multiculturales.' },
    { year: '2025', event: 'Código y Sistemas', detail: 'Construcción de estructuras digitales con propósito.' }
  ]);

  toggleSustainable() {
    return this.ui.toggleSustainableMode();
  }
}