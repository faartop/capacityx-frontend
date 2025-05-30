import { Routes } from '@angular/router';
import { ListagemComponent as ClienteListagemComponent } from './cliente/listagem/listagem.component';
import { CadastroComponent as ClienteCadastroComponent } from './cliente/cadastro/cadastro.component';
import { EdicaoComponent as ClienteEdicaoComponent } from './cliente/edicao/edicao.component';
import { ListagemComponent as AlocacaoListagemComponent } from './alocacao/listagem/listagem.component';
import { CadastroComponent as AlocacaoCadastroComponent } from './alocacao/cadastro/cadastro.component';
import { EdicaoComponent as AlocacaoEdicaoComponent } from './alocacao/edicao/edicao.component';

export const routes: Routes = [

  { path: '', redirectTo: 'cliente/listagem', pathMatch: 'full' },

  { path: 'cliente/listagem', component: ClienteListagemComponent },
  { path: 'cliente/cadastro', component: ClienteCadastroComponent },
  { path: 'cliente/edicao/:id', component: ClienteEdicaoComponent },

  { path: 'alocacao/listagem', component: AlocacaoListagemComponent },
  { path: 'alocacao/cadastro', component: AlocacaoCadastroComponent },
  { path: 'alocacao/edicao/:id', component: AlocacaoEdicaoComponent }

];
