import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface Usuario {
    id: number;
    usuario: string;
    contrasena: string;
    rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';
  private userRoleKey = 'userRole';
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.authTokenKey);
    return token ? !this.isTokenExpired(token) : false;
  }

  storeToken(token: string, role: string): void {
    localStorage.setItem(this.authTokenKey, token); // Almacena el token tal cual
    localStorage.setItem(this.userRoleKey, role);
  }

  removeToken(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userRoleKey);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
  }

  decodeToken(token: string): any {
    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return null;
      return JSON.parse(atob(payloadBase64));
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return false; // Devuelve `false` si el token no tiene expiración
    return Date.now() >= decoded.exp * 1000;
  }

  login(usuario: string, contrasena: string): Observable<any> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map((usuarios) => {
        const user = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);
        if (user) {
          // Simula un JWT válido
          const expiration = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hora de expiración
          const token = btoa(`{"sub":"${user.id}","exp":${expiration}}`);
          return {
            token: `dummy.${token}.dummy`, // Simulación de JWT
            rol: user.rol
          };
        } else {
          throw new Error('Credenciales inválidas');
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
