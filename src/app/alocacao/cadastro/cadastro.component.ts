import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alocacao } from '../alocacao.model';
import { AlocacaoService } from '../alocacao.service';
import { Router, RouterLink } from '@angular/router';
import { validaStatus } from '../../utils/globais';


@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  alocacao: Alocacao = {
    competencia: new Date(),
    id_tecnico: 0,
    id_contrato: undefined,
    id_item_projeto_categoria: undefined,
    qtd_hrs_alocadas: 0,
    qtd_hrs_comerciais: 0,
    data_exclusao: undefined
  };

    constructor(
      private alocacaoService: AlocacaoService,
      private router: Router
    ) {}

  salvarAlocacao() {
    // if (this.alocacao && this.alocacao.id_tecnico) {
    //   alert('Preencha apenas contrato ou projeto');
    //   return;
    // }

    // if (!this.alocacao.competencia || !this.alocacao.id_tecnico || this.alocacao.id_contrato || this.alocacao.id_item_projeto_categoria || this.alocacao.qtd_hrs_alocadas) {
    //   alert('Por favor, preencha todos os campos obrigatórios!');
    //   return;
    // }
    //
    // if (this.alocacao.qtd_hrs_alocadas === 0) {
    //   alert('Quantidade de horas alocadas precisa ser superior a 0');
    //   return;
    // }

    const alocacaoParaEnviar = {
      ...this.alocacao,
      id_tecnico: Number(this.alocacao.id_tecnico),
      id_contrato: this.alocacao.id_contrato ? Number(this.alocacao.id_contrato) : undefined,
      id_item_projeto_categoria: this.alocacao.id_item_projeto_categoria ? Number(this.alocacao.id_item_projeto_categoria) : undefined,
      competencia: new Date(this.alocacao.competencia),
      data_exclusao: this.alocacao.data_exclusao ? new Date(this.alocacao.data_exclusao) : undefined,
    };

    this.alocacaoService.cadastrarAlocacoes(alocacaoParaEnviar).subscribe(() => {
      this.router.navigate(['/alocacao/listagem']);
    });
  }

}
