import { Routes } from '@angular/router';

export const routes: Routes = [

    {
       path:'login',
        title:'login',
        loadComponent:()=>import('./feature/auth/pages/login/login.component').then(c=>c.LoginComponent),
        children:[]
    },

    {
        path:'register',
         title:'register',
         loadComponent:()=>import('./feature/auth/pages/register/register.component').then(c=>c.RegisterComponent)
     },
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
    }

];
