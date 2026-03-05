// src/app/pages/home/home.ts
import { Component, inject, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UI } from '../../services/ui';

interface Project {
  id: number;
  year: string;
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

@Component({
  selector: 'app-home',
  imports: [ RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  private readonly ui = inject(UI);

  readonly isSustainable = computed((): boolean => this.ui.isSustainable());

  /**
   * Proyectos destacados para la vista
   */
  readonly featuredProjects = signal<Project[]>([
    {
      id: 1,
      year: '2023',
      title: 'FORMENTERA_TECH',
      description: 'Sistema de gestión hotelera con enfoque en UX sostenible para turismo responsable.',
      tags: ['Angular', 'Backend', 'UX', 'Sostenibilidad'],
      featured: true
    },
    {
      id: 2,
      year: '2024',
      title: 'ARCH_TO_CODE',
      description: 'Herramienta que traduce especificaciones arquitectónicas a componentes reutilizables.',
      tags: ['TypeScript', 'Design System', 'Automation'],
      featured: false
    },
    {
      id: 3,
      year: '2024',
      title: 'SUSTAINABLE_UI',
      description: 'Framework de componentes optimizados para bajo consumo y máxima eficiencia.',
      tags: ['CSS', 'Performance', 'Accessibility']
    }
  ]);

  /**
   * Retorna timestamp de última actualización formateado
   */
  readonly lastUpdate = (): string => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `ÚLTIMA_ACTUALIZACIÓN: ${hours}:${minutes} UTC`;
  };

  /**
   * Retorna el año actual para copyrights
   */
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  /**
   * Método para cambiar el modo sostenible desde el UI
   */
  toggleSustainableMode(): boolean {
    return this.ui.toggleSustainableMode();
  }
}