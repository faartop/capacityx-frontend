import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiURL = 'http://localhost:3000/cliente';

  constructor(private http: HttpClient) { }

  listarClientes(
    nome?: string,
    fim_vigencia: 'null' | 'notNull' | 'all' = 'all',
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<Cliente[]> {

    const params: any = {};

    if (nome) {
      params.nome = nome;
    }

    if (fim_vigencia && fim_vigencia !== 'all') {
      params.fim_vigencia = fim_vigencia;
    }

    if (direction) {
      params.direction = direction;
    }

    return this.http.get<Cliente[]>(this.apiURL, { params });
  }

  cadastrarClientes(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiURL, cliente);
  }

  buscarCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURL}/${id}`);
  }

  atualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.patch<Cliente>(`${this.apiURL}/${id}`, cliente)
  }

  deletarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`)
  }
}
