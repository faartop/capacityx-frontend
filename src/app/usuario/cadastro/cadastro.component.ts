import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { Router, RouterLink } from '@angular/router';
import { validaStatus } from '../../utils/globais';
import {ContratoTrabalhoService} from '../../contratotrabalho/contratotrabalho.service';
import {ContratoTrabalho} from '../../contratotrabalho/contratotrabalho.model';


@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  usuario: Usuario = {
    nome: '',
    email: '',
    nivel_acesso: 0,
    id_contrato_trabalho: 0,
    inicio_vigencia: new Date(),
    fim_vigencia: undefined,
    status: false,
  };
  contratos: ContratoTrabalho[] = []

    constructor(
      private usuarioService: UsuarioService,
      private contratoTrabalhoService: ContratoTrabalhoService,
      private router: Router
    ) {}

  ngOnInit() {
    this.carregarContratos();
  }

  async carregarContratos() {
    this.contratoTrabalhoService.listarContratosTrabalho(
      undefined, undefined, 'true'
    ).subscribe((res) => {
      this.contratos = res;
    });
  }

  salvarUsuario() {

    const status = validaStatus(this.usuario.inicio_vigencia, this.usuario.fim_vigencia);

    const usuarioParaEnviar = {
      ...this.usuario,
      nivel_acesso: Number(this.usuario.nivel_acesso),
      id_contrato_trabalho: Number(this.usuario.id_contrato_trabalho),
      inicio_vigencia: new Date(this.usuario.inicio_vigencia),
      fim_vigencia: this.usuario.fim_vigencia ? new Date(this.usuario.fim_vigencia) : undefined,
      status: status
    };

    this.usuarioService.cadastrarUsuarios(usuarioParaEnviar).subscribe(() => {
      this.router.navigate(['/usuario/listagem']);
    });
  }

}
