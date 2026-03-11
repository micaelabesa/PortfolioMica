import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  template: `
    @if (isVisible()) {
      <button
        (click)="scrollToTop()"
        class="scroll-to-top-btn"
        aria-label="Ir al inicio"
        title="Ir al inicio"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
    }
  `,
  styles: [`
    .scroll-to-top-btn {
      position: fixed;
      bottom: 40px;
      right: 40px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--color-accent);
      color: var(--color-paper);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(179, 103, 155, 0.3);
      z-index: 999;
      animation: slideUp 0.3s ease-out;
    }

    .scroll-to-top-btn:hover {
      background: var(--color-accent);
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(179, 103, 155, 0.4);
    }

    .scroll-to-top-btn:active {
      transform: translateY(-2px);
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .scroll-to-top-btn {
        bottom: 20px;
        right: 20px;
        width: 44px;
        height: 44px;
        font-size: 18px;
      }
    }

    :host-context(body.sustainable-mode) .scroll-to-top-btn {
      box-shadow: 0 4px 8px rgba(179, 103, 155, 0.5);
    }

    :host-context(body.sustainable-mode) .scroll-to-top-btn:hover {
      box-shadow: 0 8px 12px rgba(179, 103, 155, 0.6);
    }
  `]
})
export class ScrollToTopComponent {
  isVisible = signal(false);
  private scrollThreshold = 300;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isVisible.set(scrollPosition > this.scrollThreshold);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}