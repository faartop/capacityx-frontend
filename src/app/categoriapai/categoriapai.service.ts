import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaPai } from './categoriapai.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaPaiService {

  private apiURL = 'http://localhost:3000/categoriapai';

  constructor(private http: HttpClient) { }

  listarCategoriaPais(
    nome?: string,
    status: 'null' | 'notNull' | 'all' = 'all',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<CategoriaPai[]> {

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

    return this.http.get<CategoriaPai[]>(this.apiURL, { params });
  }

  cadastrarCategoriaPais(categoriapai: CategoriaPai): Observable<CategoriaPai> {
    return this.http.post<CategoriaPai>(this.apiURL, categoriapai);
  }

  buscarCategoriaPai(id: number): Observable<CategoriaPai> {
    return this.http.get<CategoriaPai>(`${this.apiURL}/${id}`);
  }

  atualizarCategoriaPai(id: number, categoriapai: CategoriaPai): Observable<CategoriaPai> {
    return this.http.patch<CategoriaPai>(`${this.apiURL}/${id}`, categoriapai)
  }

  deletarCategoriaPai(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`)
  }
}
