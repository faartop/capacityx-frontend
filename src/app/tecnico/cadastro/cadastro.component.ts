import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tecnico } from '../tecnico.model';
import { TecnicoService } from '../tecnico.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../usuario/usuario.model';
import { UsuarioService } from '../../usuario/usuario.service';
import {CategoriaService} from '../../categoria/categoria.service';
import {Categoria} from '../../categoria/categoria.model';
import {validaStatus} from '../../utils/globais';


@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

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

    constructor(
      private tecnicoService: TecnicoService,
      private categoriaService: CategoriaService,
      private usuarioService: UsuarioService,
      private router: Router
    ) {}

  ngOnInit() {
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

    this.tecnicoService.cadastrarTecnicos(tecnicoParaEnviar).subscribe(() => {
      this.router.navigate(['/tecnico/listagem']);
    });
  }

}
