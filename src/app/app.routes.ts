import { Routes } from '@angular/router';
import { loginauthGuard } from './core/guards/loginauth.guard';
import { auhtwithoutGuard } from './core/guards/authwhitout/auhtwithout.guard';


export const routes: Routes = [

    {
        path:'login',
        canActivate:[auhtwithoutGuard],
        loadComponent:()=>import('./feature/auth/pages/login/login.component')
    },

    {
        path:'home',
        loadComponent: ()=>import('./feature/home/pages/home/home.component'),
    },

    {
        path:'catalogue',
        canActivate:[loginauthGuard],
        loadComponent: ()=>import('./feature/products/pages/catalogue/catalogue.component'),
    },

    {
        path:'buy',
        loadComponent: ()=>import('./feature/products/pages/buy/buy.component').then(x=>x.BuyComponent),
    },

    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    }

];
