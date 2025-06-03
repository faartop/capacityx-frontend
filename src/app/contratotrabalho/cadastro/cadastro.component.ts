import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContratoTrabalho } from '../contratotrabalho.model';
import { ContratoTrabalhoService } from '../contratotrabalho.service';
import { Router, RouterLink } from '@angular/router';
import { validaStatus } from '../../utils/globais';


@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  contratotrabalho: ContratoTrabalho = {
    nivel_tecnico: '',
    carga_horaria: 0,
    inicio_vigencia: new Date(),
    fim_vigencia: undefined,
    status: false,
  };

    constructor(
      private contratotrabalhoService: ContratoTrabalhoService,
      private router: Router
    ) {}

  salvarContratoTrabalho() {
    // if (this.contratotrabalho && this.contratotrabalho.id_tecnico) {
    //   alert('Preencha apenas contrato ou projeto');
    //   return;
    // }

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
      status: status
    };

    this.contratotrabalhoService.cadastrarContratosTrabalho(contratotrabalhoParaEnviar).subscribe(() => {
      this.router.navigate(['/contrato-trabalho/listagem']);
    });
  }

}
