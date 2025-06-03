import  { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaPaiService } from '../categoriapai.service';
import { CategoriaPai } from '../categoriapai.model';
import { validaStatus } from '../../utils/globais';


@Component({
  selector: 'app-edicao',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edicao.component.html',
  styleUrl: './edicao.component.css'
})
export class EdicaoComponent implements OnInit {

  categoriapai: CategoriaPai = {
    descricao: '',
    inicio_vigencia: new Date(),
    fim_vigencia: undefined,
  };
  private id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriapaiService: CategoriaPaiService,
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.carregarCategoriaPai();
  }

  carregarCategoriaPai() {
    if(!this.id || isNaN(this.id)) {
      this.router.navigate(['/listagem']);
    }

    this.categoriapaiService.buscarCategoriaPai(this.id).subscribe((a) => {
      this.categoriapai = {
        ...a,
        inicio_vigencia: a.inicio_vigencia ? new Date(a.inicio_vigencia).toISOString().split('T')[0] : '',
        fim_vigencia: a.fim_vigencia ? new Date(a.fim_vigencia).toISOString().split('T')[0] : undefined
      };
    });
  }

  salvarCategoriaPai() {

    const status = validaStatus(this.categoriapai.inicio_vigencia, this.categoriapai.fim_vigencia);

    const categoriapaiParaEnviar = {
      ...this.categoriapai,
      inicio_vigencia: new Date(this.categoriapai.inicio_vigencia),
      fim_vigencia: this.categoriapai.fim_vigencia ? new Date(this.categoriapai.fim_vigencia) : undefined,
      status: status
    };

    this.categoriapaiService.atualizarCategoriaPai(this.id, categoriapaiParaEnviar).subscribe(() => {
      this.router.navigate(['/categoria-pai/listagem']);
    });
  }

}
