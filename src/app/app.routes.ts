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
        path: 'perfil',
        loadComponent: () => import('./page/perfil/perfil.component'),
        children: [
            {
                path: 'userlist',
                loadComponent: () => import('./page/perfil/usuarios/usuarios.component')
            },
            {
                path: 'updateUser/:id',
                loadComponent: () => import('./page/perfil/update-user/update-user.component')
            }
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
