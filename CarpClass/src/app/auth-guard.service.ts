import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getUserRole();

    // Comprobar si el usuario está autenticado y tiene el rol requerido
    if (this.authService.isAuthenticated()) {
      const expectedRole = route.data['expectedRole']; // Acceso a expectedRole con corchetes

      if (expectedRole && expectedRole !== role) {
        // Redirigir si no tiene el rol esperado
        this.router.navigate(['/not-found']);
        return false;
      }
      return true; 
    } else {
      this.router.navigate(['login']);
      return false; // Redirigir al login si no está autenticado
    }
  }
}
