import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UI } from '../../services/ui';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact {
  private readonly ui = inject(UI);
  private readonly fb = inject(FormBuilder);

  readonly isSustainable = signal(this.ui.isSustainable());
  readonly isSubmitting = signal(false);
  readonly submitSuccess = signal(false);
  readonly submitError = signal(false);

  /**
   * Formulario reactivo de contacto
   */
  contactForm: FormGroup;

  /**
   * Información de contacto directo
   */
  contactInfo = [
    {
      type: 'Email',
      value: 'micaela.besasso@hotmail.com',
      icon: '✉',
      link: 'mailto:micaela.besasso@hotmail.com'
    },
    {
      type: 'LinkedIn',
      value: 'micaela-besasso',
      icon: '💼',
      link: 'https://www.linkedin.com/in/micaela-besasso-'
    },
    {
      type: 'GitHub',
      value: 'micaelabesa',
      icon: '⚙',
      link: 'https://github.com/micaelabesa'
    }
  ];

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  /**
   * Enviar formulario
   */
  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(false);
    this.submitSuccess.set(false);

    // Simular envío
    const formData = this.contactForm.value;
    console.log('Enviando:', formData);

    // Simular delay de 1.5s
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);
      this.contactForm.reset();

      // Limpiar mensaje de éxito después de 5s
      setTimeout(() => {
        this.submitSuccess.set(false);
      }, 5000);
    }, 1500);
  }

  /**
   * Getter para validaciones
   */
  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get subject() {
    return this.contactForm.get('subject');
  }

  get message() {
    return this.contactForm.get('message');
  }

  /**
   * Toggle modo sostenible
   */
  toggleSustainableMode(): boolean {
    return this.ui.toggleSustainableMode();
  }
}