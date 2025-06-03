import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaPai } from '../categoriapai.model';
import { CategoriaPaiService } from '../categoriapai.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  categoriapai: CategoriaPai = {
    descricao: '',
    inicio_vigencia: new Date(),
    fim_vigencia: undefined,
  };

    constructor(
      private categoriapaiService: CategoriaPaiService,
      private router: Router
    ) {}

  salvarCategoriaPai() {

    const categoriapaiParaEnviar = {
      ...this.categoriapai,
      inicio_vigencia: new Date(this.categoriapai.inicio_vigencia),
      fim_vigencia: this.categoriapai.fim_vigencia ? new Date(this.categoriapai.fim_vigencia) : undefined,
    };

    this.categoriapaiService.cadastrarCategoriaPais(categoriapaiParaEnviar).subscribe(() => {
      this.router.navigate(['/categoria-pai/listagem']);
    });
  }

}
