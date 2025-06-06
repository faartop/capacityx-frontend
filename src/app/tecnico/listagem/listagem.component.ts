import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tecnico } from '../tecnico.model';
import { TecnicoService } from '../tecnico.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  tecnicos: Tecnico[] = [];
  viewMode: 'gallery' | 'list' = 'list';
  isSidebarOpen = false;

  filtroFimVigencia: 'true' | 'false' | 'all' = 'all';
  filtroDirecao: 'asc' | 'desc' = 'asc';

  constructor(private tecnicoService: TecnicoService) {}

  ngOnInit() {
    this.carregarTecnicos();
  }

  carregarTecnicos() {
    this.tecnicoService.listarTecnicos(
      this.filtroFimVigencia,
      this.filtroDirecao
    ).subscribe((res) => {
      this.tecnicos = res;
    });
  }

  filtrarTecnicos() {
    this.carregarTecnicos();
  }

  excluirTecnico(id: number | undefined) {
    if (id === undefined) {
      return;
    }

    this.tecnicoService.deletarTecnico(id).subscribe(() => {
      this.carregarTecnicos();
    });
  }

  toggleView() {
    this.viewMode = this.viewMode === 'gallery' ? 'list' : 'gallery';
  }
}
