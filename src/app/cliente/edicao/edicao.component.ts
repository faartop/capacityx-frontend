import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-edicao',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edicao.component.html',
  styleUrl: './edicao.component.css'
})
export class EdicaoComponent implements OnInit {

  cliente: Cliente = {
    id_usuario: 0,
    nome: '',
    status: false,
    inicio_vigencia: new Date(),
    fim_vigencia: undefined
  };
  private id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.carregarCliente();
  }

  carregarCliente() {
    if(!this.id || isNaN(this.id)) {
      this.router.navigate(['/listagem']);
    }

    this.clienteService.buscarCliente(this.id).subscribe((a) => {
      this.cliente = {
        ...a,
        inicio_vigencia: a.inicio_vigencia ? new Date(a.inicio_vigencia).toISOString().split('T')[0] : '',
        fim_vigencia: a.fim_vigencia ? new Date(a.fim_vigencia).toISOString().split('T')[0] : undefined
      };
    });
  }

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

    this.clienteService.atualizarCliente(this.id, clienteParaEnviar).subscribe(() => {
      this.router.navigate(['/listagem']);
    });
  }

}
