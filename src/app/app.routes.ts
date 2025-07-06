import { Routes } from '@angular/router';
import { LoginFormComponent } from './features/login/components/login-form/login-form.component';
//import { AppComponent } from './app.component';
//import { TaskListComponent } from './features/tasks/components/task-list/task-list.component';
import { authGuard } from './core/guards/auth.guard';

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
    { path: '**', redirectTo: '' }
];
