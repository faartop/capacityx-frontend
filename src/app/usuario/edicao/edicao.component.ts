import  { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario.model';
import { validaStatus } from '../../utils/globais';
import { ContratoTrabalho } from '../../contratotrabalho/contratotrabalho.model';
import  {ContratoTrabalhoService } from '../../contratotrabalho/contratotrabalho.service';


@Component({
  selector: 'app-edicao',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edicao.component.html',
  styleUrl: './edicao.component.css'
})
export class EdicaoComponent implements OnInit {

  usuario: Usuario = {
    nome: '',
    email: '',
    nivel_acesso: 0,
    id_contrato_trabalho: 0,
    inicio_vigencia: new Date(),
    fim_vigencia: undefined,
    status: false,
  };
  private id!: number;
  contratos: ContratoTrabalho[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private contratoTrabalhoService: ContratoTrabalhoService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.carregarUsuario();

    this.carregarContratos();
  }

  async carregarContratos() {
    this.contratoTrabalhoService.listarContratosTrabalho(
      undefined, undefined, 'true'
    ).subscribe((res) => {
      this.contratos = res;
    });
  }

  carregarUsuario() {
    if(!this.id || isNaN(this.id)) {
      this.router.navigate(['/listagem']);
    }

    this.usuarioService.buscarUsuario(this.id).subscribe((a) => {
      this.usuario = {
        ...a,
        inicio_vigencia: a.inicio_vigencia ? new Date(a.inicio_vigencia).toISOString().split('T')[0] : '',
        fim_vigencia: a.fim_vigencia ? new Date(a.fim_vigencia).toISOString().split('T')[0] : undefined
      };
    });
  }

  salvarUsuario() {

    const status = validaStatus(this.usuario.inicio_vigencia, this.usuario.fim_vigencia);

    const usuarioParaEnviar = {
      ...this.usuario,
      inicio_vigencia: new Date(this.usuario.inicio_vigencia),
      fim_vigencia: this.usuario.fim_vigencia ? new Date(this.usuario.fim_vigencia) : undefined,
      status: status
    };

    this.usuarioService.atualizarUsuario(this.id, usuarioParaEnviar).subscribe(() => {
      this.router.navigate(['/usuario/listagem']);
    });
  }

}
