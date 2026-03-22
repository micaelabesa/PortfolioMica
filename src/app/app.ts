import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Nav } from './components/nav/nav';
import { AlertService } from './services/alertservice';
import { ScrollToTopComponent } from "./components/scroll-to-top/scroll-to-top";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer, Nav, ScrollToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
  
export class App {
  protected readonly title = signal('PortfolioMica');
 
  private readonly alertService = inject(AlertService);

  constructor() {
 
  this.alertService.info(
    '🚧 Sitio en Construcción',
    'Este portfolio está siendo constantemente actualizado. ¡Gracias por tu paciencia!',
    'Entendido');
    window.scrollTo(0, 0);
}
}