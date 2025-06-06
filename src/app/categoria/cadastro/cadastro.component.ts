import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../usuario/usuario.model';
import { UsuarioService } from '../../usuario/usuario.service';
import { CategoriaPaiService } from '../../categoriapai/categoriapai.service';
import { CategoriaPai } from '../../categoriapai/categoriapai.model';


@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  categoria: Categoria = {
    descricao: '',
    inicio_vigencia: new Date(),
    fim_vigencia: undefined,
    id_categoria_pai: 0,
    id_responsavel: 0,
  };
  categorias_pai: CategoriaPai[] = [];
  usuarios: Usuario[] = []

    constructor(
      private categoriaService: CategoriaService,
      private categoriaPaiService: CategoriaPaiService,
      private usuarioService: UsuarioService,
      private router: Router
    ) {}

  ngOnInit() {
    this.carregarCategoriasPai();

    this.carregarUsuarios();
  }

  async carregarCategoriasPai() {
    this.categoriaPaiService.listarCategoriaPais(
    ).subscribe((res) => {
      this.categorias_pai = res;
    });
  }

  async carregarUsuarios() {
    this.usuarioService.listarUsuarios(
      undefined, 'true'
    ).subscribe((res) => {
      this.usuarios = res;
    });
  }

  salvarCategoria() {

    const categoriaParaEnviar = {
      ...this.categoria,
      nivel_acesso: Number(this.categoria.id_categoria_pai),
      id_contrato_trabalho: Number(this.categoria.id_responsavel),
      inicio_vigencia: new Date(this.categoria.inicio_vigencia),
      fim_vigencia: this.categoria.fim_vigencia ? new Date(this.categoria.fim_vigencia) : undefined,
    };

    this.categoriaService.cadastrarCategorias(categoriaParaEnviar).subscribe(() => {
      this.router.navigate(['/categoria/listagem']);
    });
  }

}
