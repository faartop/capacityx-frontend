import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContratoTrabalho } from '../contratotrabalho.model';
import { ContratoTrabalhoService } from '../contratotrabalho.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  contratostrabalho: ContratoTrabalho[] = [];
  viewMode: 'gallery' | 'list' = 'list';
  isSidebarOpen = false;

  filtroPesquisa: string = '';
  carga_horaria: number | undefined = undefined;
  filtroFimVigencia: 'true' | 'false' | 'all' = 'all';
  filtroDirecao: 'asc' | 'desc' = 'asc';

  constructor(private contratotrabalhoService: ContratoTrabalhoService) {}

  ngOnInit() {
    this.carregarContratosTrabalho();
  }

  carregarContratosTrabalho() {
    this.contratotrabalhoService.listarContratosTrabalho(
      this.filtroPesquisa,
      this.carga_horaria,
      this.filtroFimVigencia,
      this.filtroDirecao
    ).subscribe((res) => {
      this.contratostrabalho = res;
    });
  }

  filtrarContratosTrabalho() {
    this.carregarContratosTrabalho();
  }

  excluirContratoTrabalho(id: number | undefined) {
    if (id === undefined) {
      return;
    }

    this.contratotrabalhoService.deletarContratoTrabalho(id).subscribe(() => {
      this.carregarContratosTrabalho();
    });
  }

  toggleView() {
    this.viewMode = this.viewMode === 'gallery' ? 'list' : 'gallery';
  }
}
