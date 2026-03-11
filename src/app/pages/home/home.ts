import { Component, inject, ChangeDetectionStrategy, computed, ElementRef, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UI } from '../../services/ui';
import { ProyectosService } from '../../services/proyectos.service';
import { CardTiltService } from '../../services/card-tilt-service';

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
  private cardTilt = inject(CardTiltService);
  private el = inject(ElementRef);

  readonly isSustainable = computed((): boolean => this.ui.isSustainable());
  readonly proyectos = this.proyectosService.proyectos;

 constructor() {
        // afterNextRender garantiza que @for ya renderizó todo
        afterNextRender(() => {
            this.runTypingSequence();
            this.cardTilt.initScrollReveal(this.el.nativeElement);
            this.cardTilt.initCard3DTilt(this.el.nativeElement);
        });
  }


  private typeText(element: HTMLElement, text: string, delay = 60): Promise<void> {
    return new Promise(resolve => {
      let i = 0;
      element.textContent = '';

      const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  }

  private async runTypingSequence(): Promise<void> {
    const greeting = document.querySelector('.hero-greeting .typing-content') as HTMLElement;
    const greetingCursor = document.querySelector('.hero-greeting .cursor') as HTMLElement;
    const title = document.querySelector('.typing-text-title .typing-content') as HTMLElement;

    if (!greeting || !greetingCursor || !title) return;

    await this.typeText(greeting, 'Hola! Soy', 120);
    await new Promise<void>(r => setTimeout(r, 600));

    greetingCursor.style.display = 'none';

    await this.typeText(title, 'Micaela Besasso.', 120);
  }

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