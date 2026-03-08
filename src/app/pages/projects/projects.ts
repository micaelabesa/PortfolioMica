import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UI } from '../../services/ui';

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

  readonly isSustainable = signal(this.ui.isSustainable());

  /**
   * Proyectos completos - Estructuras
   */
  readonly proyectos = signal<Proyecto[]>([
    {
      id: 1,
      year: '2024',
      title: 'FORMENTERA_TECH',
      description: 'Sistema de gestión hotelera con enfoque en UX sostenible para turismo responsable. Integración completa de booking, inventario y analíticas.',
      tags: ['Angular', 'TypeScript', 'Node.js', 'MongoDB', 'UX/UI', 'Sostenibilidad'],
      featured: true,
      link: '#'
    },
    {
      id: 2,
      year: '2024',
      title: 'ARCH_TO_CODE',
      description: 'Herramienta que traduce especificaciones arquitectónicas a componentes reutilizables. Automatiza la generación de código desde diagramas.',
      tags: ['TypeScript', 'Design System', 'Automation', 'Web Components'],
      featured: false,
      link: '#'
    },
    {
      id: 3,
      year: '2023',
      title: 'SUSTAINABLE_UI',
      description: 'Framework de componentes optimizados para bajo consumo y máxima eficiencia. Reducción del 40% en tamaño de bundle.',
      tags: ['CSS', 'Performance', 'Accessibility', 'Web Standards'],
      featured: false,
      link: '#'
    },
    {
      id: 4,
      year: '2023',
      title: 'DATA_VISUALIZATION',
      description: 'Plataforma de visualización de datos con enfoque en accesibilidad. Soporta múltiples formatos y exportación en tiempo real.',
      tags: ['D3.js', 'React', 'Analytics', 'Accessibility'],
      featured: false,
      link: '#'
    },
    {
      id: 5,
      year: '2022',
      title: 'MICRO_FRONTEND_ARCH',
      description: 'Arquitectura de micro frontends escalable para aplicaciones empresariales. Independencia de despliegue y versionado.',
      tags: ['Module Federation', 'Webpack', 'TypeScript', 'Architecture'],
      featured: false,
      link: '#'
    },
    {
      id: 6,
      year: '2022',
      title: 'PWA_FRAMEWORK',
      description: 'Framework especializado en Progressive Web Apps con soporte offline. Sincronización inteligente y caché estratégico.',
      tags: ['PWA', 'Service Workers', 'IndexedDB', 'Performance'],
      featured: false,
      link: '#'
    }
  ]);

  /**
   * Retorna el año actual
   */
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  /**
   * Toggle modo sostenible
   */
  toggleSustainableMode(): boolean {
    return this.ui.toggleSustainableMode();
  }

}
