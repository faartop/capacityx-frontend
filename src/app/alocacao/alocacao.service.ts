import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alocacao } from './alocacao.model';

@Injectable({
  providedIn: 'root'
})
export class AlocacaoService {

  private apiURL = 'http://localhost:3000/alocacao';

  constructor(private http: HttpClient) { }

  listarAlocacoes(
    competencia?: Date,
    id_tecnico?: number,
    id_contrato?: number,
    id_item_projeto_categoria?: number,
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<Alocacao[]> {

    const params: any = {};

    if (competencia) {
      params.competencia = competencia;
    }

    if (id_tecnico) {
      params.id_tecnico = id_tecnico;
    }

    if (id_contrato) {
      params.id_contrato = id_contrato;
    }

    if (id_item_projeto_categoria) {
      params.id_item_projeto_categoria = id_item_projeto_categoria;
    }

    if (direction) {
      params.direction = direction;
    }

    return this.http.get<Alocacao[]>(this.apiURL, { params });
  }

  cadastrarAlocacoes(alocacao: Alocacao): Observable<Alocacao> {
    return this.http.post<Alocacao>(this.apiURL, alocacao);
  }

  buscarAlocacao(id: number): Observable<Alocacao> {
    return this.http.get<Alocacao>(`${this.apiURL}/${id}`);
  }

  atualizarAlocacao(id: number, alocacao: Alocacao): Observable<Alocacao> {
    return this.http.patch<Alocacao>(`${this.apiURL}/${id}`, alocacao)
  }

  deletarAlocacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`)
  }
}
