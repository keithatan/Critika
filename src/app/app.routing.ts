import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { MySubmissionsComponent } from './my-submissions/my-submissions.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component'
import { Component } from '@angular/core';
import { FeedbackComponent } from './feedback/feedback.component';
import { AccountComponent } from './account/account.component';




export const AppRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',

    },
    {   
        path: 'account',
        component: AccountComponent

    },
    {   
        path: 'home',
        component: HomeComponent

    },
    {
        path:'profile',
        component: ProfileComponent
    },
    {
        path: 'submissions',
        component: MySubmissionsComponent
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
        path: 'admin',
        component: AdminComponent

    },
    {
        path: 'feedback',
        component: FeedbackComponent
    },
    {
        //404 error, leave this one as last route check
        path: '**',
        component: DashboardComponent,
    }
]