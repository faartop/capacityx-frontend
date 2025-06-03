import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiURL = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) { }

  listarUsuarios(
    nome?: string,
    status: 'true' | 'false' | 'all' = 'all',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<Usuario[]> {

    const params: any = {};

    if (nome) {
      params.nome = nome;
    }

    if (status && status !== 'all') {
      params.status = status;
    }

    if (direction) {
      params.direction = direction;
    }

    return this.http.get<Usuario[]>(this.apiURL, { params });
  }

  cadastrarUsuarios(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiURL, usuario);
  }

  buscarUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiURL}/${id}`);
  }

  atualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiURL}/${id}`, usuario)
  }

  deletarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`)
  }
}
