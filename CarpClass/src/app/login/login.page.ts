import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: any = {
    Usuario: "",
    Contrasena: ""
  };

  faltante: string = "";

  constructor(
    public toastController: ToastController,
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthService
  ) { }

  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() { }

  validateModel(model: any) {
    for (var [key, value] of Object.entries(model)) {
      if (value == "") {
        this.faltante = key;
        return false;
      }
    }
    return true;
  }

  validarUsuario(dato: string) {
    if (dato.length >= 3 && (dato.includes('@duocuc.cl') || dato.includes('@profesor.duoc.cl'))) {
      return true;
    }
    return false;
  }

  validarContra(dato: string) {
    if (dato.length >= 8 && dato.length <= 15) {
      return true;
    }
    return false;
  }

  ingresar() {
    console.log('Datos de inicio de sesión:', this.login);
    if (this.validateModel(this.login)) {
      if (this.validarUsuario(this.login.Usuario)) {
        if (this.validarContra(this.login.Contrasena)) {
          this.authService.login(this.login.Usuario, this.login.Contrasena).subscribe(
            (response: any) => {
              console.log('Respuesta completa de la API:', response);

              // Reconoce tanto 'role' como 'rol' en la respuesta
              const role = response?.role?.trim().toLowerCase() || response?.rol?.trim().toLowerCase() || "no especificado";
              if (role === "no especificado") {
                this.presentToast("Error: El rol no fue especificado en la respuesta.");
                return;
              }

              const token = response.token;
              this.authService.storeToken(token, role);
              this.presentToast("¡Bienvenido " + this.login.Usuario + "!");

              let navigationExtras: NavigationExtras = {
                state: { user: this.login.Usuario }
              };

              if (role === 'docente') {
                this.router.navigate(['home'], navigationExtras);
              } else if (role === 'alumno') {
                this.router.navigate(['alumno'], navigationExtras);
              } else {
                this.presentToast(`Rol no reconocido o no especificado: ${role}`);
              }
            },
            (error: any) => {
              console.error('Error al iniciar sesión:', error);
              if (error.status === 401) {
                this.presentToast("Credenciales inválidas. Intenta de nuevo.");
              } else {
                this.presentToast("Error al iniciar sesión. Por favor, verifica tus credenciales.");
              }
            }
          );
        } else {
          this.presentToast("La contraseña debe tener un mínimo de 8 caracteres y un máximo de 15.");
          this.login.Contrasena = "";
        }
      } else {
        this.presentToast("El usuario debe tener al menos 3 caracteres y debe incluir '@duocuc.cl' o '@profesor.duoc.cl'.");
        this.login.Usuario = "";
      }
    } else {
      this.presentToast("Falta rellenar el campo: " + this.faltante);
    }
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration ? duration : 2000
    });
    toast.present();
  }
}
