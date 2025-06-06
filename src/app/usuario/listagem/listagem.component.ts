import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  usuarios: Usuario[] = [];
  viewMode: 'gallery' | 'list' = 'list';
  isSidebarOpen = false;

  filtroPesquisa: string = '';
  filtroFimVigencia: 'true' | 'false' | 'all' = 'all';
  filtroDirecao: 'asc' | 'desc' = 'asc';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.listarUsuarios(
      this.filtroPesquisa,
      this.filtroFimVigencia,
      this.filtroDirecao
    ).subscribe((res) => {
      this.usuarios = res;
    });
  }

  filtrarUsuarios() {
    this.carregarUsuarios();
  }

  nivelAcessoDescricao(nivel: number) {
    const niveis: Record<number, string> = {
      0: 'Técnico',
      1: 'Coordenador',
      2: 'Diretor',
      3: 'RH',
      4: 'Administrador'
    };

    return niveis[nivel] || 'Desconhecido';
  }

  excluirUsuario(id: number | undefined) {
    if (id === undefined) {
      return;
    }

    this.usuarioService.deletarUsuario(id).subscribe(() => {
      this.carregarUsuarios();
    });
  }

  toggleView() {
    this.viewMode = this.viewMode === 'gallery' ? 'list' : 'gallery';
  }
}
