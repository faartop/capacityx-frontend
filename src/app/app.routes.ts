import { Routes } from '@angular/router';
import { ListagemComponent } from './cliente/listagem/listagem.component';
import { CadastroComponent } from './cliente/cadastro/cadastro.component';
import { EdicaoComponent } from './cliente/edicao/edicao.component';

export const routes: Routes = [

  { path: '', redirectTo: 'listagem', pathMatch: 'full' },

  { path: 'listagem', component: ListagemComponent },

  { path: 'cadastro', component: CadastroComponent },

  { path: 'edicao/:id', component: EdicaoComponent }

];
