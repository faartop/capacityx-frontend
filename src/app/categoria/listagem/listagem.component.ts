import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  categorias: Categoria[] = [];
  viewMode: 'gallery' | 'list' = 'list';
  isSidebarOpen = false;

  filtroPesquisa: string = '';
  filtroFimVigencia: 'null' | 'notNull' | 'all' = 'all';
  filtroDirecao: 'asc' | 'desc' = 'asc';

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.listarCategorias(
      this.filtroPesquisa,
      this.filtroFimVigencia,
      this.filtroDirecao
    ).subscribe((res) => {
      this.categorias = res;
    });
  }

  filtrarCategorias() {
    this.carregarCategorias();
  }

  excluirCategoria(id: number | undefined) {
    if (id === undefined) {
      return;
    }

    this.categoriaService.deletarCategoria(id).subscribe(() => {
      this.carregarCategorias();
    });
  }

  toggleView() {
    this.viewMode = this.viewMode === 'gallery' ? 'list' : 'gallery';
  }
}
