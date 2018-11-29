import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { MySubmissionsComponent } from './my-submissions/my-submissions.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component'
import { Component } from '@angular/core';
import { FeedbackComponent } from './feedback/feedback.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { AuthGuard } from './auth/auth-guard';

const AppRoutes: Routes = [
  {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',

  },
  {   
      path: 'account',
      component: EditAccountComponent,
      canActivate: [AuthGuard]

  },
  {   
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard]

  },
  {
      path:'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'submissions',
      component: MySubmissionsComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard]
  
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
      component: AdminComponent,
      canActivate: [AuthGuard]

  },
  {
      path: 'feedback',
      component: FeedbackComponent,
      canActivate: [AuthGuard]
  },
  {
      //404 error, leave this one as last route check
      path: '**',
      component: DashboardComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule { }
