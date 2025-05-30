import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { AlocacaoService } from '../alocacao.service';
import { Alocacao } from '../alocacao.model';
import { validaStatus } from '../../utils/globais';


@Component({
  selector: 'app-edicao',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edicao.component.html',
  styleUrl: './edicao.component.css'
})
export class EdicaoComponent implements OnInit {

  alocacao: Alocacao = {
    competencia: new Date(),
    id_tecnico: 0,
    id_contrato: undefined,
    id_item_projeto_categoria: undefined,
    qtd_hrs_alocadas: 0,
    qtd_hrs_comerciais: 0,
    data_exclusao: undefined
  };
  private id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alocacaoService: AlocacaoService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.carregarAlocacao();
  }

  carregarAlocacao() {
    if(!this.id || isNaN(this.id)) {
      this.router.navigate(['/alocacao/listagem']);
    }

    this.alocacaoService.buscarAlocacao(this.id).subscribe((a) => {
      this.alocacao = {
        ...a,
        competencia: a.competencia ? new Date(a.competencia).toISOString().slice(0, 7) : '',
        data_exclusao: a.data_exclusao ? new Date(a.data_exclusao).toISOString().split('T')[0] : undefined
      };
    });
  }

  salvarAlocacao() {
    if (this.alocacao && this.alocacao.id_tecnico) {
      alert('Preencha apenas contrato ou projeto');
      return;
    }

    if (!this.alocacao.competencia || !this.alocacao.id_tecnico || this.alocacao.id_contrato || this.alocacao.id_item_projeto_categoria || this.alocacao.qtd_hrs_alocadas) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    if (this.alocacao.qtd_hrs_alocadas === 0) {
      alert('Quantidade de horas alocadas precisa ser superior a 0');
      return;
    }

    const alocacaoParaEnviar = {
      ...this.alocacao,
      id_tecnico: Number(this.alocacao.id_tecnico),
      id_contrato: this.alocacao.id_contrato ? Number(this.alocacao.id_contrato) : undefined,
      id_item_projeto_categoria: this.alocacao.id_item_projeto_categoria ? Number(this.alocacao.id_item_projeto_categoria) : undefined,
      competencia: new Date(this.alocacao.competencia),
      data_exclusao: this.alocacao.data_exclusao ? new Date(this.alocacao.data_exclusao) : undefined,
    };

    this.alocacaoService.atualizarAlocacao(this.id, alocacaoParaEnviar).subscribe(() => {
      this.router.navigate(['/alocacao/listagem']);
    });
  }

}
