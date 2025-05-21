import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-edicao',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './edicao.component.html',
  styleUrl: './edicao.component.css'
})
export class EdicaoComponent implements OnInit {

  cliente: Cliente = {
    id: 0,
    id_usuario: 0,
    nome: '',
    status: false,
    inicio_vigencia: new Date(),
    fim_vigencia: new Date()
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
      this.cliente = a;
    });
  }

  salvarCliente() {
    if(!this.cliente) return;

    this.clienteService.atualizarCliente(this.id, this.cliente).subscribe((a) => {
      this.router.navigate(['/listagem']);
    })
  }

}
