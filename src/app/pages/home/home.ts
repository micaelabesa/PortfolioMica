import { Component, inject, ChangeDetectionStrategy, computed, ElementRef, afterNextRender, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  imports: [ RouterLink ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.sustainable-mode]': 'isSustainable()'
  }
})
export class Home {
  private readonly ui = inject(UI);
  private readonly proyectosService = inject(ProyectosService);
  private cardTilt = inject(CardTiltService);
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  readonly isSustainable = computed(() => this.ui.isSustainable());
  readonly proyectos = this.proyectosService.proyectos;

  constructor() {
    // afterNextRender garantiza que @for ya renderizó todo el DOM antes de ejecutar
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.runTypingSequence();
        const skillsInitialized = this.initSkillsScrollAnimation();  // ← Captura retorno
        this.cardTilt.initScrollReveal(this.el.nativeElement);
        this.cardTilt.initCard3DTilt(this.el.nativeElement);
      }
    });
  }

  /**
   * Inicializa la animación de scroll para las tarjetas de habilidades
   * @returns boolean - true si se inicializó correctamente, false si no hay tarjetas
   */
  private initSkillsScrollAnimation(): boolean {
    const skillCards = this.el.nativeElement.querySelectorAll('.skill-card');

    // Si no hay tarjetas, retornar false
    if (!skillCards.length) {
      return false;
    }

    // Crear Intersection Observer para detectar cuando las tarjetas entran en viewport
    const observer = new IntersectionObserver(
      (entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');  // ← Aquí ocurre la magia
            observer.unobserve(entry.target);
            }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'  
      }
    );

    skillCards.forEach((card: Element) => {
      observer.observe(card);
    });

    return true; 
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

    if (!greeting || !greetingCursor || !title) {
      return;
    }

    await this.typeText(greeting, 'Hola! Soy', 120);

    await new Promise<void>(r => setTimeout(r, 600));

    greetingCursor.style.display = 'none';

    await this.typeText(title, 'Micaela Besasso.', 120);
  }

  readonly currentYear = computed(() => new Date().getFullYear());

  lastUpdate(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `ÚLTIMA_ACTUALIZACIÓN: ${hours}:${minutes} UTC`;
  }

  toggleSustainableMode(): void {
    this.ui.toggleSustainableMode();
  }
}