import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Cliente} from '../cliente.model';
import {ClienteService} from '../cliente.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterLink],
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

    const validaStatus = (date1: string | Date, date2?: string | Date): boolean => {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
      if (!d1 || isNaN(d1.getTime()) || d1 > hoje) {
        return false;
      }

      if (!date2) {
        return true;
      }

      const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
      return !d2 || isNaN(d2.getTime()) || d2 >= hoje;
    };

    const status = validaStatus(this.cliente.inicio_vigencia, this.cliente.fim_vigencia);

    const clienteParaEnviar = {
      ...this.cliente,
      id_usuario: Number(this.cliente.id_usuario),
      inicio_vigencia: new Date(this.cliente.inicio_vigencia),
      fim_vigencia: this.cliente.fim_vigencia ? new Date(this.cliente.fim_vigencia) : undefined,
      status: status
    };

    this.clienteService.cadastrarClientes(clienteParaEnviar).subscribe(() => {
      this.router.navigate(['/listagem']);
    });
  }

}
