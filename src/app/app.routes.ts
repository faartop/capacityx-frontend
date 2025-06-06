import { Routes } from '@angular/router';
import { ListagemComponent as ClienteListagemComponent } from './cliente/listagem/listagem.component';
import { CadastroComponent as ClienteCadastroComponent } from './cliente/cadastro/cadastro.component';
import { EdicaoComponent as ClienteEdicaoComponent } from './cliente/edicao/edicao.component';
import { ListagemComponent as AlocacaoListagemComponent } from './alocacao/listagem/listagem.component';
import { CadastroComponent as AlocacaoCadastroComponent } from './alocacao/cadastro/cadastro.component';
import { EdicaoComponent as AlocacaoEdicaoComponent } from './alocacao/edicao/edicao.component';
import { ListagemComponent as ContratoTrabalhoListagemComponent } from './contratotrabalho/listagem/listagem.component';
import { CadastroComponent as ContratoTrabalhoCadastroComponent } from './contratotrabalho/cadastro/cadastro.component';
import { EdicaoComponent as ContratoTrabalhoEdicaoComponent } from './contratotrabalho/edicao/edicao.component';
import { ListagemComponent as UsuarioListagemComponent } from './usuario/listagem/listagem.component';
import { CadastroComponent as UsuarioCadastroComponent } from './usuario/cadastro/cadastro.component';
import { EdicaoComponent as UsuarioEdicaoComponent } from './usuario/edicao/edicao.component';
import { ListagemComponent as CategoriaPaiListagemComponent } from './categoriapai/listagem/listagem.component';
import { CadastroComponent as CategoriaPaiCadastroComponent } from './categoriapai/cadastro/cadastro.component';
import { EdicaoComponent as CategoriaPaiEdicaoComponent } from './categoriapai/edicao/edicao.component';
import { ListagemComponent as CategoriaListagemComponent } from './categoria/listagem/listagem.component';
import { CadastroComponent as CategoriaCadastroComponent } from './categoria/cadastro/cadastro.component';
import { EdicaoComponent as CategoriaEdicaoComponent } from './categoria/edicao/edicao.component';
import { ListagemComponent as TecnicoListagemComponent } from './tecnico/listagem/listagem.component';
import { CadastroComponent as TecnicoCadastroComponent } from './tecnico/cadastro/cadastro.component';
import { EdicaoComponent as TecnicoEdicaoComponent } from './tecnico/edicao/edicao.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [

  { path: '', redirectTo: 'cliente/listagem', pathMatch: 'full' },

  { path: 'cliente/listagem', component: ClienteListagemComponent },
  { path: 'cliente/cadastro', component: ClienteCadastroComponent },
  { path: 'cliente/edicao/:id', component: ClienteEdicaoComponent },

  { path: 'alocacao/listagem', component: AlocacaoListagemComponent },
  { path: 'alocacao/cadastro', component: AlocacaoCadastroComponent },
  { path: 'alocacao/edicao/:id', component: AlocacaoEdicaoComponent },

  { path: 'contrato-trabalho/listagem', component: ContratoTrabalhoListagemComponent },
  { path: 'contrato-trabalho/cadastro', component: ContratoTrabalhoCadastroComponent },
  { path: 'contrato-trabalho/edicao/:id', component: ContratoTrabalhoEdicaoComponent },

  { path: 'usuario/listagem', component: UsuarioListagemComponent },
  { path: 'usuario/cadastro', component: UsuarioCadastroComponent },
  { path: 'usuario/edicao/:id', component: UsuarioEdicaoComponent },

  { path: 'categoria-pai/listagem', component: CategoriaPaiListagemComponent },
  { path: 'categoria-pai/cadastro', component: CategoriaPaiCadastroComponent },
  { path: 'categoria-pai/edicao/:id', component: CategoriaPaiEdicaoComponent },

  { path: 'categoria/listagem', component: CategoriaListagemComponent },
  { path: 'categoria/cadastro', component: CategoriaCadastroComponent },
  { path: 'categoria/edicao/:id', component: CategoriaEdicaoComponent },

  { path: 'tecnico/listagem', component: TecnicoListagemComponent },
  { path: 'tecnico/cadastro', component: TecnicoCadastroComponent },
  { path: 'tecnico/edicao/:id', component: TecnicoEdicaoComponent },

  { path: 'home', component: HomeComponent }

];
