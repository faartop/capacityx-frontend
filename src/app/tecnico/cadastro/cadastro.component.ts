import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Router, RouterLink } from '@angular/router';
import { validaStatus } from '../../utils/globais';


@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  cliente: Cliente = {
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
    if (!this.cliente.nome || !this.cliente.inicio_vigencia) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const status = validaStatus(this.cliente.inicio_vigencia, this.cliente.fim_vigencia);

    const clienteParaEnviar = {
      ...this.cliente,
      inicio_vigencia: new Date(this.cliente.inicio_vigencia),
      fim_vigencia: this.cliente.fim_vigencia ? new Date(this.cliente.fim_vigencia) : undefined,
      status: status
    };

    this.clienteService.cadastrarClientes(clienteParaEnviar).subscribe(() => {
      this.router.navigate(['/cliente/listagem']);
    });
  }

}
