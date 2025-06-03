import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriaPai } from '../categoriapai.model';
import { CategoriaPaiService } from '../categoriapai.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  categoriapais: CategoriaPai[] = [];
  viewMode: 'gallery' | 'list' = 'list';
  isSidebarOpen = false;

  filtroPesquisa: string = '';
  filtroFimVigencia: 'null' | 'notNull' | 'all' = 'all';
  filtroDirecao: 'asc' | 'desc' = 'asc';

  constructor(private categoriapaiService: CategoriaPaiService) {}

  ngOnInit() {
    this.carregarCategoriaPais();
  }

  carregarCategoriaPais() {
    this.categoriapaiService.listarCategoriaPais(
      this.filtroPesquisa,
      this.filtroFimVigencia,
      this.filtroDirecao
    ).subscribe((res) => {
      this.categoriapais = res;
    });
  }

  filtrarCategoriaPais() {
    this.carregarCategoriaPais();
  }

  excluirCategoriaPai(id: number | undefined) {
    if (id === undefined) {
      return;
    }

    this.categoriapaiService.deletarCategoriaPai(id).subscribe(() => {
      this.carregarCategoriaPais();
    });
  }

  toggleView() {
    this.viewMode = this.viewMode === 'gallery' ? 'list' : 'gallery';
  }
}
