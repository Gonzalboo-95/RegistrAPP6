import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = '';
  showToast: boolean = false;

  constructor(private router: Router, private toastController: ToastController) { }

  async sendVerificationCode() {
    // Aquí se simula el envío del código de verificación
    // En una aplicación real, deberías hacer una llamada a tu backend para enviar el código

    // Mostrar un mensaje de confirmación ficticio
    const toast = await this.toastController.create({
      message: 'Se ha enviado un código de verificación al correo electrónico proporcionado.',
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    toast.present();
    
    // Redirigir al usuario a la página de verificación si fuera necesario
    // this.router.navigate(['/verify-code']);
  }
}
