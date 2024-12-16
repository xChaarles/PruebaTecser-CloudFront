import { Routes } from '@angular/router';
import { adminGuard, userGuard } from './service/user.guard';

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
        canActivate:[adminGuard, userGuard],
        children: [
            {
                path: 'userlist',
                loadComponent: () => import('./page/perfil/usuarios/usuarios.component'),
                canActivate:[adminGuard,userGuard]
            },
            {
                path: 'updateUser/:id',
                loadComponent: () => import('./page/perfil/update-user/update-user.component'),
                canActivate:[adminGuard]
            },
            {
                path: 'detalleUser/:id',
                loadComponent: () => import('./page/perfil/detalle-user/detalle-user.component'),
                canActivate:[adminGuard]
            }
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
