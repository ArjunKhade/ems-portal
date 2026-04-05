import { Routes } from '@angular/router';
import { employeeResolver } from './components/resolvers/employee.resolver';

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
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
