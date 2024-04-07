import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { CheckOutComponent } from './components/pages/check-out/check-out.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RestorePwComponent } from './components/auth/restore-pw/restore-pw.component';

export const routes: Routes = [
    { 
        path : '',
        pathMatch : 'full',
        redirectTo : 'login'
    },
    {
        path : 'login',
        component : LoginComponent 
    },
    {
        path : 'register',
        component : RegisterComponent
    },
    {
        path : 'restore-password',
        component : RestorePwComponent
    },
    {
        path : 'restore-password/:token',
        component : RestorePwComponent
    },
    {
        path : 'home',
        //canActivate: [authGuard],
        component : HomeComponent 
    },
    {
        path : 'cart',
        canActivate: [authGuard],
        component : CartComponent 
    },
    {
        path : 'checkout/:cid',
        canActivate: [authGuard],
        component : CheckOutComponent 
    },
    {
        path: "**",
        component : NotFoundComponent
    }
];
