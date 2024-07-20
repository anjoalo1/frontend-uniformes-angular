import {  Routes } from "@angular/router";
import { loginauthGuard } from "../../../core/guards/loginauth.guard";


const routers:Routes =[

    {
        path:'',
        title:'',
        loadComponent:()=>import('./login/login.component')
    },

    {
        path:'register',
        title:'register',
        canActivate: [loginauthGuard],
        loadComponent:()=>import('./register/register.component')
    }

    
];


export default routers;