import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';




export const AppRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',

    },
    {
        path: 'dashboard',
        component: DashboardComponent
    
    },
    {
        path: 'register',
        component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent
        
    },
    {
        //404 error, leave this one as last route check
        path: '**',
        component: DashboardComponent,
    }
]