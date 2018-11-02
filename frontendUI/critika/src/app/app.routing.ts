import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';




export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        outlet: 'Auth'
    },
    {
        path: 'register',
        component: SignupComponent,
        outlet: 'noAuth'
    },
    {
        path: 'login',
        component: LoginComponent,
        outlet: 'noAuth'
    },
]