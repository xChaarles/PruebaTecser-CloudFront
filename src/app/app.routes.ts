import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./page/login/login.component')
    },
    {
        path: 'registro',
        loadComponent: () => import('./page/registrar/registrar.component')
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
