import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Alocacao } from '../alocacao.model';
import { AlocacaoService } from '../alocacao.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  alocacoes: Alocacao[] = [];
  viewMode: 'gallery' | 'list' = 'list';
  isSidebarOpen = false;

  competencia: Date | undefined = undefined;
  id_tecnico: number | undefined = undefined;
  id_contrato: number | undefined = undefined;
  id_item_projeto_categoria: number | undefined = undefined;
  filtroDirecao: 'asc' | 'desc' = 'asc';

  constructor(private alocacaoService: AlocacaoService) {}

  ngOnInit() {
    this.carregarAlocacoes();
  }

  carregarAlocacoes() {
    this.alocacaoService.listarAlocacoes(
      this.competencia,
      this.id_tecnico,
      this.id_contrato,
      this.id_item_projeto_categoria,
      this.filtroDirecao
    ).subscribe((res) => {
      this.alocacoes = res;
    });
  }

  filtrarAlocacoes() {
    this.carregarAlocacoes();
  }

  toggleView() {
    this.viewMode = this.viewMode === 'gallery' ? 'list' : 'gallery';
  }
}
