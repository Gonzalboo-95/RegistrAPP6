import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';  // Aquí puedes cambiar la URL si es necesario

  constructor(private http: HttpClient) { }

  // Obtener todas las asignaturas
  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asignaturas`);
  }

  // Obtener asignatura por id
  getAsignatura(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/asignaturas/${id}`);
  }

  // Eliminar una asignatura
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/asignaturas/${id}`);
  }

  // Obtener usuarios (tanto docentes como alumnos)
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  // Obtener un usuario por ID
  getUsuario(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/${id}`);
  }

  // Crear un nuevo usuario (solo para administración, si es necesario)
  createUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }

  // Actualizar un usuario existente
  updateUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  // Eliminar un usuario
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }

  // Obtener sesiones de clase
  getSesionesClase(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sesionesClase`);
  }

  // Obtener sesión de clase por ID
  getSesionClase(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/sesionesClase/${id}`);
  }

  // Crear sesión de clase
  createSesionClase(sesion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sesionesClase`, sesion);
  }

  // Eliminar una sesión de clase
  deleteSesionClase(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/sesionesClase/${id}`);
  }

  // Registrar asistencia en una sesión de clase
  registrarAsistencia(sesionId: number, asistencia: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sesionesClase/${sesionId}/asistencia`, asistencia);
  }
}
