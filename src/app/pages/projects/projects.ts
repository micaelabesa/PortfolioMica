import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UI } from '../../services/ui';
import { ProyectosService } from '../../services/proyectos.service';

interface Proyecto {
  id: number;
  year: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  featured?: boolean;
  link?: string;
}

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private readonly ui = inject(UI);
  private readonly proyectosService = inject(ProyectosService);

  readonly isSustainable = signal(this.ui.isSustainable());
  readonly proyectos = this.proyectosService.proyectos;


  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  toggleSustainableMode(): boolean {
    return this.ui.toggleSustainableMode();
  }

}
