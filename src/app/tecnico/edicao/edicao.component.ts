import  { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TecnicoService } from '../tecnico.service';
import { Tecnico } from '../tecnico.model';
import { Usuario } from '../../usuario/usuario.model';
import { UsuarioService } from '../../usuario/usuario.service';
import { Categoria } from '../../categoria/categoria.model';
import { CategoriaService } from '../../categoria/categoria.service';
import { validaStatus } from '../../utils/globais';


@Component({
  selector: 'app-edicao',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edicao.component.html',
  styleUrl: './edicao.component.css'
})
export class EdicaoComponent implements OnInit {

  tecnico: Tecnico = {
    id_usuario: 0,
    id_categoria: 0,
    know_how: 0,
    inicio_vigencia: new Date(),
    fim_vigencia: undefined,
    status: true,
  };
  usuarios: Usuario[] = []
  categorias: Categoria[] = []
  private id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tecnicoService: TecnicoService,
    private categoriaService: CategoriaService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.carregarTecnico();

    this.carregarCategorias();

    this.carregarUsuarios();
  }

  async carregarCategorias() {
    this.categoriaService.listarCategorias(
    ).subscribe((res) => {
      this.categorias = res;
    });
  }

  async carregarUsuarios() {
    this.usuarioService.listarUsuarios(
      undefined, 'true'
    ).subscribe((res) => {
      this.usuarios = res;
    });
  }

  carregarTecnico() {
    if(!this.id || isNaN(this.id)) {
      this.router.navigate(['/listagem']);
    }

    this.tecnicoService.buscarTecnico(this.id).subscribe((a) => {
      this.tecnico = {
        ...a,
        inicio_vigencia: a.inicio_vigencia ? new Date(a.inicio_vigencia).toISOString().split('T')[0] : '',
        fim_vigencia: a.fim_vigencia ? new Date(a.fim_vigencia).toISOString().split('T')[0] : undefined
      };
    });
  }

  salvarTecnico() {

    const status = validaStatus(this.tecnico.inicio_vigencia, this.tecnico.fim_vigencia)

    const tecnicoParaEnviar = {
      ...this.tecnico,
      id_usuario: Number(this.tecnico.id_usuario),
      id_categoria: Number(this.tecnico.id_categoria),
      know_how: Number(this.tecnico.know_how),
      inicio_vigencia: new Date(this.tecnico.inicio_vigencia),
      fim_vigencia: this.tecnico.fim_vigencia ? new Date(this.tecnico.fim_vigencia) : undefined,
      status: status,
    };

    this.tecnicoService.atualizarTecnico(this.id, tecnicoParaEnviar).subscribe(() => {
      this.router.navigate(['/tecnico/listagem']);
    });
  }

}
