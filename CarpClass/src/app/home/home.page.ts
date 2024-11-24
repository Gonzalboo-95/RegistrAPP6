import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  asignaturas: any[] = [];
  userName: string = '';
  role: string = '';
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.userName = (navigation.extras.state as any)['user'] || 'Usuario';
      this.role = (navigation.extras.state as any)['role'] || 'estudiante';
    }

    // Mostrar loader mientras se cargan las asignaturas
    const loading = await this.loadingController.create({
      message: 'Cargando asignaturas...'
    });
    await loading.present();
    try {
      await this.obtenerAsignaturas();  // Esperar a que se carguen las asignaturas
    } catch (error) {
      console.error('Error al obtener asignaturas:', error);
    } finally {
      this.isLoading = false;
      loading.dismiss();  // Asegurarnos de que el loader se oculta después de que se cargue todo
    }
  }

  // Método para obtener asignaturas
  async obtenerAsignaturas() {
    try {
      // Usamos el método getAll() del ApiService para obtener las asignaturas
      const data = await this.apiService.getAll().toPromise();
      this.asignaturas = data;
    } catch (error) {
      console.error('Error al obtener asignaturas:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al obtener las asignaturas. Intenta nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Método para eliminar una asignatura con confirmación
  async eliminarAsignatura(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta asignatura?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            // Mostrar loading durante la eliminación
            const loading = await this.loadingController.create({
              message: 'Eliminando asignatura...'
            });
            await loading.present();
  
            try {
              // Usamos el método delete() del ApiService para eliminar la asignatura
              const response = await this.apiService.delete(id).toPromise();
              console.log('Respuesta de la eliminación:', response); // Agregar para depurar la respuesta
  
              // Si la eliminación es exitosa, actualizamos la lista de asignaturas
              this.asignaturas = this.asignaturas.filter(asignatura => asignatura.id !== id);
  
              // Mostrar éxito
              const successAlert = await this.alertController.create({
                header: 'Éxito',
                message: 'Asignatura eliminada correctamente.',
                buttons: ['OK']
              });
              await successAlert.present();
            } catch (error: any) {  // Aquí se indica que 'error' es de tipo 'any'
              console.error('Error al eliminar asignatura:', error);
              // Mostrar error si no se pudo eliminar
              const errorAlert = await this.alertController.create({
                header: 'Error',
                message: `No se pudo eliminar la asignatura. Detalles: ${error.message}`,
                buttons: ['OK']
              });
              await errorAlert.present();
            } finally {
              loading.dismiss();
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  // Método de cierre de sesión
  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
