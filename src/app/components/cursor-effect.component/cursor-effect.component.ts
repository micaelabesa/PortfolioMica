import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor-effect',
  imports: [CommonModule],
  templateUrl: './cursor-effect.component.html',
  styleUrl: './cursor-effect.component.css',
})
export class CursorEffectComponent {
    cursorX = signal(0);
  cursorY = signal(0);
  shadowX = signal(0);
  shadowY = signal(0);
 
  // ✅ ANGULAR V20+: @HostListener sin decorador (usar en clase)
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const { clientX, clientY } = event;
    
    // Cursor dot sigue exactamente
    this.cursorX.set(clientX);
    this.cursorY.set(clientY);
    
    // Shadow tiene un pequeño delay (lag effect)
    setTimeout(() => {
      this.shadowX.set(clientX);
      this.shadowY.set(clientY);
    }, 80);
  }
 
  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.cursorX.set(-100);
    this.cursorY.set(-100);
    this.shadowX.set(-100);
    this.shadowY.set(-100);
  }
}
