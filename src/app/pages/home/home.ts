import { Component, inject, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UI } from '../../services/ui';
import { ProyectosService } from '../../services/proyectos.service';

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
  private readonly proyectosService = inject(ProyectosService);

  readonly isSustainable = computed((): boolean => this.ui.isSustainable());
  readonly proyectos = this.proyectosService.proyectos;

 
  readonly lastUpdate = (): string => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `ÚLTIMA_ACTUALIZACIÓN: ${hours}:${minutes} UTC`;
  };

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  toggleSustainableMode(): boolean {
    return this.ui.toggleSustainableMode();
  }
}