import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  clientes: Cliente[] = [];
  viewMode: 'gallery' | 'list' = 'list';
  isSidebarOpen = false;

  filtroPesquisa: string = '';
  filtroFimVigencia: 'true' | 'false' | 'all' = 'all';
  filtroDirecao: 'asc' | 'desc' = 'asc';

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.listarClientes(
      this.filtroPesquisa,
      this.filtroFimVigencia,
      this.filtroDirecao
    ).subscribe((res) => {
      this.clientes = res;
    });
  }

  filtrarClientes() {
    this.carregarClientes();
  }

  excluirCliente(id: number | undefined) {
    if (id === undefined) {
      return;
    }

    this.clienteService.deletarCliente(id).subscribe(() => {
      this.carregarClientes();
    });
  }

  toggleView() {
    this.viewMode = this.viewMode === 'gallery' ? 'list' : 'gallery';
  }
}
