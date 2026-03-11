import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  private readonly http = inject(HttpClient);

  readonly isSustainable = signal(this.ui.isSustainable());
  readonly isSubmitting = signal(false);
  readonly submitSuccess = signal(false);
  readonly submitError = signal(false);
  readonly submitErrorMessage = signal('');
  readonly contactVisible = signal(false);

  toggleContactVisibility() {
      this.contactVisible.update(v => !v);
  }

  contactForm: FormGroup;

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

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(false);
    this.submitSuccess.set(false);

    const formData = this.contactForm.value;

    // Enviar a la Vercel Function
    this.http.post('/api/contact', formData).subscribe({
      next: (response: any) => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        this.contactForm.reset();

        // Limpiar mensaje después de 5s
        setTimeout(() => {
          this.submitSuccess.set(false);
        }, 5000);
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.submitError.set(true);
        this.submitErrorMessage.set(
          error.error?.error || 'Error al enviar el formulario'
        );

        // Limpiar error después de 5s
        setTimeout(() => {
          this.submitError.set(false);
        }, 5000);
      }
    });
  }

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

  toggleSustainableMode(): boolean {
    return this.ui.toggleSustainableMode();
  }
}