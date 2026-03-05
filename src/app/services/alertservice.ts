import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {
  
  /**
   * Alerta de éxito
   */
  success(title: string, message?: string, confirmButtonText: string = 'OK') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: confirmButtonText,
      confirmButtonColor: '#2d5a27'
    });
  }

  /**
   * Alerta de error
   */
  error(title: string, message?: string, confirmButtonText: string = 'OK') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: confirmButtonText,
      confirmButtonColor: '#ef4444'
    });
  }

  /**
   * Alerta de advertencia
   */
  warning(title: string, message?: string, confirmButtonText: string = 'OK') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: confirmButtonText,
      confirmButtonColor: '#f59e0b'
    });
  }

  /**
   * Alerta de información
   */
  info(title: string, message?: string, confirmButtonText: string = 'OK') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      confirmButtonText: confirmButtonText,
      confirmButtonColor: '#2d5a27'
    });
  }

  /**
   * Alerta de construcción/en desarrollo
   */
  underConstruction(feature: string = 'Esta sección') {
    return Swal.fire({
      title: '🚧 En Construcción',
      text: `${feature} está aún en desarrollo. ¡Vuelve pronto!`,
      icon: 'info',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#2d5a27',
      allowOutsideClick: true
    });
  }

  /**
   * Dialog de confirmación
   */
  confirm(title: string, message?: string, confirmText: string = 'Sí', cancelText: string = 'No'): Promise<any> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      confirmButtonColor: '#2d5a27',
      cancelButtonColor: '#ef4444'
    });
  }

  /**
   * Dialog con input de texto
   */
  inputText(title: string, label: string, placeholder?: string): Promise<any> {
    return Swal.fire({
      title: title,
      input: 'text',
      inputLabel: label,
      inputPlaceholder: placeholder || '',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2d5a27',
      cancelButtonColor: '#ef4444'
    });
  }

  /**
   * Dialog con input de email
   */
  inputEmail(title: string, label: string = 'Email'): Promise<any> {
    return Swal.fire({
      title: title,
      input: 'email',
      inputLabel: label,
      inputPlaceholder: 'tu@email.com',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2d5a27',
      cancelButtonColor: '#ef4444'
    });
  }

  /**
   * Loading/Spinner
   */
  loading(title: string = 'Cargando...', message?: string) {
    return Swal.fire({
      title: title,
      text: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  /**
   * Cerrar alerta
   */
  close() {
    Swal.close();
  }

  /**
   * Ocultar loading
   */
  hideLoading() {
    Swal.hideLoading();
  }
}