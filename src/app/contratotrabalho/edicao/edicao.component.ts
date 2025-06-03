import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { ContratoTrabalhoService } from '../contratotrabalho.service';
import { ContratoTrabalho } from '../contratotrabalho.model';
import { validaStatus } from '../../utils/globais';


@Component({
  selector: 'app-edicao',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edicao.component.html',
  styleUrl: './edicao.component.css'
})
export class EdicaoComponent implements OnInit {

  contratotrabalho: ContratoTrabalho = {
    nivel_tecnico: '',
    carga_horaria: 0,
    inicio_vigencia: new Date(),
    fim_vigencia: undefined,
    status: false,
  };
  private id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contratotrabalhoService: ContratoTrabalhoService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.carregarContratoTrabalho();
  }

  carregarContratoTrabalho() {
    if(!this.id || isNaN(this.id)) {
      this.router.navigate(['/contrato-trabalho/listagem']);
    }

    this.contratotrabalhoService.buscarContratoTrabalho(this.id).subscribe((a) => {
      this.contratotrabalho = {
        ...a,
        inicio_vigencia: a.inicio_vigencia ? new Date(a.inicio_vigencia).toISOString().split('T')[0] : '',
        fim_vigencia: a.fim_vigencia ? new Date(a.fim_vigencia).toISOString().split('T')[0] : undefined
      };
    });
  }

  salvarContratoTrabalho() {
    // if (this.contratotrabalho && this.contratotrabalho.id_tecnico) {
    //   alert('Preencha apenas contrato ou projeto');
    //   return;
    // }
    //
    // if (!this.contratotrabalho.competencia || !this.contratotrabalho.id_tecnico || this.contratotrabalho.id_contrato || this.contratotrabalho.id_item_projeto_categoria || this.contratotrabalho.qtd_hrs_alocadas) {
    //   alert('Por favor, preencha todos os campos obrigatórios!');
    //   return;
    // }
    //
    // if (this.contratotrabalho.qtd_hrs_alocadas === 0) {
    //   alert('Quantidade de horas alocadas precisa ser superior a 0');
    //   return;
    // }

    const status = validaStatus(this.contratotrabalho.inicio_vigencia, this.contratotrabalho.fim_vigencia);

    const contratotrabalhoParaEnviar = {
      ...this.contratotrabalho,
      inicio_vigencia: new Date(this.contratotrabalho.inicio_vigencia),
      fim_vigencia: this.contratotrabalho.fim_vigencia ? new Date(this.contratotrabalho.fim_vigencia) : undefined,
      status: status,
    };

    this.contratotrabalhoService.atualizarContratoTrabalho(this.id, contratotrabalhoParaEnviar).subscribe(() => {
      this.router.navigate(['/contrato-trabalho/listagem']);
    });
  }

}
