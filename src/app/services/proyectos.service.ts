import { Injectable, signal } from '@angular/core';

export interface Proyecto {
  id: number;
  year: string;
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  link?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  readonly proyectos = signal<Proyecto[]>([
    {
      id: 1,
      year: '2025',
      title: 'UPGRADEFOOD',
      description: 'Sistema de gestión hotelera con enfoque en UX sostenible para turismo responsable. Integración completa de gestión de reservas, reseñas y analíticas.',
      tags: ['Angular', 'TypeScript', 'MongoDB', 'UX/UI'],
      featured: true,
      link: 'https://upgradefood.web.app/'
    },
    {
      id: 2,
      year: '2026',
      title: 'EMPRESA CONSTRUCTORA',
      description: 'En proceso de desarrollo.',
      tags: ['Angular','TypeScript', 'FastAPI', 'MySQL', 'Web Components'],
      featured: false,
      link: '#'
    },
    {
      id: 3,
      year: '2026',
      title: 'ROSITA CLERICI',
      description: 'Simplificación de identidad corporativa y desarrollo web de alto rendimiento para organizar y digitalizar el amplio abanico de servicios de una experta local en las Baleares.',
      tags: ['Next.js','TypeScript', 'Web Components'],
      featured: true,
      link: 'https://real-formentera.vercel.app/'
    }
  ]);

}