import { Routes } from '@angular/router';
import { Login } from '../login/login';
import { Register } from '../register/register';
import { PageWelcome } from '../page-welcome/page-welcome';
import { Accueil } from '../accueil/accueil';
import { Profil } from '../profil/profil';
import { authGard } from '../service/authGuard';
import { Admin } from '../admin/admin';
import { CreateRecipe } from '../create-recipe/create-recipe';
import { Explorer } from '../explorer/explorer';
import { Favoris } from '../favoris/favoris';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'welcome', component: PageWelcome },
    { path: 'accueil', canActivate: [authGard], loadComponent: () => import('../accueil/accueil').then(m => m.Accueil)},
    { path: 'profil', component: Profil, canActivate: [authGard] },
    { path: 'admin', component: Admin},
    { path: 'createRecipe', component: CreateRecipe},
    { path: 'explorer', component: Explorer },
    { path: 'favoris', component: Favoris },
    { path: '', redirectTo: '/accueil', pathMatch: 'full' },
    { path: '**', redirectTo: '/welcome' },
];

