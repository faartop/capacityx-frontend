import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tecnico } from './tecnico.model';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  private apiURL = 'http://localhost:3000/tecnico';

  constructor(private http: HttpClient) { }

  listarTecnicos(
    status: 'true' | 'false' | 'all' = 'all',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<Tecnico[]> {

    const params: any = {};

    if (status && status !== 'all') {
      params.status = status;
    }

    if (direction) {
      params.direction = direction;
    }

    return this.http.get<Tecnico[]>(this.apiURL, { params });
  }

  cadastrarTecnicos(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(this.apiURL, tecnico);
  }

  buscarTecnico(id: number): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${this.apiURL}/${id}`);
  }

  atualizarTecnico(id: number, tecnico: Tecnico): Observable<Tecnico> {
    return this.http.patch<Tecnico>(`${this.apiURL}/${id}`, tecnico)
  }

  deletarTecnico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`)
  }
}
