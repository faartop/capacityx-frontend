import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContratoTrabalho } from './contratotrabalho.model';

@Injectable({
  providedIn: 'root'
})
export class ContratoTrabalhoService {

  private apiURL = 'http://localhost:3000/contratotrabalho';

  constructor(private http: HttpClient) { }

  listarContratosTrabalho(
    nivel_tecnico?: string,
    carga_horaria?: number,
    status: 'true' | 'false' | 'all' = 'all',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<ContratoTrabalho[]> {

    const params: any = {};

    if (nivel_tecnico) {
      params.nivel_tecnico = nivel_tecnico;
    }

    if (carga_horaria) {
      params.carga_horaria = carga_horaria;
    }

    if (status && status !== 'all') {
      params.status = status;
    }

    if (direction) {
      params.direction = direction;
    }

    return this.http.get<ContratoTrabalho[]>(this.apiURL, { params });
  }

  cadastrarContratosTrabalho(contratotrabalho: ContratoTrabalho): Observable<ContratoTrabalho> {
    return this.http.post<ContratoTrabalho>(this.apiURL, contratotrabalho);
  }

  buscarContratoTrabalho(id: number): Observable<ContratoTrabalho> {
    return this.http.get<ContratoTrabalho>(`${this.apiURL}/${id}`);
  }

  atualizarContratoTrabalho(id: number, contratotrabalho: ContratoTrabalho): Observable<ContratoTrabalho> {
    return this.http.patch<ContratoTrabalho>(`${this.apiURL}/${id}`, contratotrabalho)
  }

  deletarContratoTrabalho(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`)
  }
}
