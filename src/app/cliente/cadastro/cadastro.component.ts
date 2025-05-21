import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Cliente} from '../cliente.model';
import {ClienteService} from '../cliente.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  cliente: Cliente = {
    id_usuario: 0,
    nome: '',
    status: false,
    inicio_vigencia: new Date(),
    fim_vigencia: undefined
  };

    constructor(
      private clienteService: ClienteService,
      private router: Router
    ) {}

  salvarCliente() {
    if (!this.cliente.nome || !this.cliente.id_usuario || !this.cliente.inicio_vigencia) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const clienteParaEnviar = {
      ...this.cliente,
      id_usuario: Number(this.cliente.id_usuario),
      inicio_vigencia: new Date(this.cliente.inicio_vigencia),
      fim_vigencia: this.cliente.fim_vigencia ? new Date(this.cliente.fim_vigencia) : undefined
    };

    this.clienteService.cadastrarClientes(clienteParaEnviar).subscribe(() => {
      this.router.navigate(['/listagem']);
    });
  }

}
