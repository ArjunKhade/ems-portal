import { Routes } from '@angular/router';
import { employeeResolver } from './core/resolvers/employee.resolver';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/auth/signup/signup').then((m) => m.Signup),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
    resolve: {
      employees: employeeResolver
    }
  },
  {
    path: 'how-to-use',
    loadComponent: () => import('./components/how-to-use/how-to-use').then((m) => m.HowToUse),
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
