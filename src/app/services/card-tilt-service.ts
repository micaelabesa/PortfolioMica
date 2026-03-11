import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CardTiltService {

    initScrollReveal(container: HTMLElement, selector = '.project-card'): void {
        const cards = container.querySelectorAll(selector);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, i * 120);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        cards.forEach((card) => observer.observe(card));
    }

    initCard3DTilt(container: HTMLElement, selector = '.project-card'): void {
        const cards = container.querySelectorAll<HTMLElement>(selector);

        cards.forEach((card) => {
            card.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const rotateX = (((e.clientY - rect.top) / rect.height) - 0.5) * -16;
                const rotateY = (((e.clientX - rect.left) / rect.width) - 0.5) * 16;
                card.style.transform = `scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
            });

            card.addEventListener('touchmove', (e: TouchEvent) => {
                const touch = e.touches[0];
                const rect = card.getBoundingClientRect();
                const rotateX = (((touch.clientY - rect.top) / rect.height) - 0.5) * -10;
                const rotateY = (((touch.clientX - rect.left) / rect.width) - 0.5) * 10;
                card.style.transform = `scale(1.01) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }, { passive: true });

            card.addEventListener('touchend', () => {
                card.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
            });
        });
    }
}