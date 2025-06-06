import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiURL = 'http://localhost:3000/categoria';

  constructor(private http: HttpClient) { }

  listarCategorias(
    descricao?: string,
    fim_vigencia: 'null' | 'notNull' | 'all' = 'all',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<Categoria[]> {

    const params: any = {};

    if (descricao) {
      params.descricao = descricao;
    }

    if (fim_vigencia && fim_vigencia !== 'all') {
      params.fim_vigencia = fim_vigencia;
    }

    if (direction) {
      params.direction = direction;
    }

    return this.http.get<Categoria[]>(this.apiURL, { params });
  }

  cadastrarCategorias(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiURL, categoria);
  }

  buscarCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiURL}/${id}`);
  }

  atualizarCategoria(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.patch<Categoria>(`${this.apiURL}/${id}`, categoria)
  }

  deletarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`)
  }
}
