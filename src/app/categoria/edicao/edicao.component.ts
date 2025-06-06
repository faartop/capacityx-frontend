import  { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';
import {Usuario} from '../../usuario/usuario.model';
import {CategoriaPaiService} from '../../categoriapai/categoriapai.service';
import {UsuarioService} from '../../usuario/usuario.service';
import {CategoriaPai} from '../../categoriapai/categoriapai.model';


@Component({
  selector: 'app-edicao',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edicao.component.html',
  styleUrl: './edicao.component.css'
})
export class EdicaoComponent implements OnInit {

  categoria: Categoria = {
    descricao: '',
    inicio_vigencia: new Date(),
    fim_vigencia: undefined,
    id_categoria_pai: 0,
    id_responsavel: 0,
  };
  private id!: number;
  categorias_pai: CategoriaPai[] = [];
  usuarios: Usuario[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private categoriaPaiService: CategoriaPaiService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.carregarCategoria();

    this.carregarCategoriasPai();

    this.carregarUsuarios();
  }

  async carregarCategoriasPai() {
    this.categoriaPaiService.listarCategoriaPais(
      undefined, 'notNull'
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

  carregarCategoria() {
    if(!this.id || isNaN(this.id)) {
      this.router.navigate(['/listagem']);
    }

    this.categoriaService.buscarCategoria(this.id).subscribe((a) => {
      this.categoria = {
        ...a,
        inicio_vigencia: a.inicio_vigencia ? new Date(a.inicio_vigencia).toISOString().split('T')[0] : '',
        fim_vigencia: a.fim_vigencia ? new Date(a.fim_vigencia).toISOString().split('T')[0] : undefined
      };
    });
  }

  salvarCategoria() {

    const categoriaParaEnviar = {
      ...this.categoria,
      inicio_vigencia: new Date(this.categoria.inicio_vigencia),
      fim_vigencia: this.categoria.fim_vigencia ? new Date(this.categoria.fim_vigencia) : undefined,
    };

    this.categoriaService.atualizarCategoria(this.id, categoriaParaEnviar).subscribe(() => {
      this.router.navigate(['/categoria/listagem']);
    });
  }

}
