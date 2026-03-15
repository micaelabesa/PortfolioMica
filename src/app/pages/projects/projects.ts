import { Component, inject, ChangeDetectionStrategy, signal, ElementRef, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UI } from '../../services/ui';
import { ProyectosService } from '../../services/proyectos.service';
import { CardTiltService } from '../../services/card-tilt-service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  private readonly ui = inject(UI);
  private readonly proyectosService = inject(ProyectosService);
  private readonly cardTilt = inject(CardTiltService);
  private readonly el = inject(ElementRef);

  readonly isSustainable = signal(this.ui.isSustainable());
  readonly proyectos = this.proyectosService.proyectos;

  constructor() {
    afterNextRender(() => {
      this.cardTilt.initScrollReveal(this.el.nativeElement);
      this.cardTilt.initCard3DTilt(this.el.nativeElement);
    });
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  toggleSustainableMode() {
    return this.ui.toggleSustainableMode();
  }

}
