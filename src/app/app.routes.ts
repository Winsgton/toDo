import { SucessoComponent } from './features/futuro/components/sucesso/sucesso/sucesso.component';
import { Routes } from '@angular/router';
import { LoginFormComponent } from './features/login/components/login-form/login-form.component';
//import { AppComponent } from './app.component';
//import { TaskListComponent } from './features/tasks/components/task-list/task-list.component';
import { authGuard } from './core/guards/auth.guard';
import { InicialComponent } from './features/futuro/components/inicial/inicial/inicial.component';
import { ComeceagoraComponent } from './features/futuro/components/comeceagora/comeceagora/comeceagora.component';
import { PreConsultaComponent } from './features/futuro/components/preConsulta/pre-consulta/pre-consulta.component';
import { SimulacaoComponent } from './features/futuro/components/simulacao/simulacao/simulacao.component';
import { AutenticacaoComponent } from './features/futuro/components/autenticacao/autenticacao/autenticacao.component';
import { UploadDocComponent } from './features/futuro/components/uploadDoc/upload-doc/upload-doc.component';
import { ContaComponent } from './features/futuro/components/conta/conta/conta.component';
import { ContratoComponent } from './features/futuro/components/contrato/contrato/contrato.component';
import { AcompanhamentoComponent } from './features/futuro/components/acompanhamento/acompanhamento/acompanhamento.component';

export const routes: Routes = [
//     { path: '', canActivate: [authGuard],
//       loadComponent: () => import('./features/tasks/components/task-list/task-list.component').then(m => m.TaskListComponent)
//     },
    { path: '',
      loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
      canActivate: [authGuard],
      children: [
        {
            path: '',
            loadComponent: () => import('./features/tasks/components/task-list/task-list.component').then(m => m.TaskListComponent)
        },
        {
            path: 'counter',
            loadComponent: () => import('./features/counter/components/form/counter/counter.component').then(m => m.CounterComponent)
        }
      ]
    },
    { path: 'login', component: LoginFormComponent },
    { path: 'inicial', component: InicialComponent },
    { path: 'comeceagora', component: ComeceagoraComponent },
    { path: 'pre-consulta', component: PreConsultaComponent },
    { path: 'simulacao', component: SimulacaoComponent },
    { path: 'autenticacao', component: AutenticacaoComponent },
    { path: 'upload-doc', component: UploadDocComponent },
    { path: 'conta', component: ContaComponent },
    { path: 'contrato', component: ContratoComponent },
    { path: 'sucesso', component: SucessoComponent },
    { path: 'acompanhamento', component: AcompanhamentoComponent },
    { path: '**', redirectTo: '' }
];
