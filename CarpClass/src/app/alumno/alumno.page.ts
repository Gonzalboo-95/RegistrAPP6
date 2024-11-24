import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  userName: string | null = '';
  role: string | null = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Obtener el nombre de usuario y el rol desde el almacenamiento local
    this.userName = localStorage.getItem('userName') || 'Estudiante';
    this.role = localStorage.getItem('userRole'); // 'userRole' debería ser el nombre clave del rol en localStorage
  }

  logout() {
    // Llamar al método del servicio de autenticación para cerrar sesión
    this.authService.removeToken();
    this.router.navigate(['/login']); // Redirigir al usuario a la página de login
  }
}
