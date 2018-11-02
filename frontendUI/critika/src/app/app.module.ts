import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router'
import { AppRoutes } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';


//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MyQueueComponent } from './my-queue/my-queue.component';
import {AddSubComponent} from './profile/add-sub/add-sub.component';
import { ProfileComponent } from './profile/profile.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/auth.interceptor';





import { MySubmissionsComponent } from './my-submissions/my-submissions.component';
import { SpendCoinsComponent } from './profile/spend-coins/spend-coins.component';
import { EditSubComponent } from './profile/edit-sub/edit-sub.component';


@NgModule({
  declarations: [
    AppComponent,
    AddSubComponent,
    DashboardComponent,
    HomeComponent,
    MyQueueComponent,
    ProfileComponent,
    SpendCoinsComponent,
    EditSubComponent,
    MySubmissionsComponent,
    LoginComponent,
    SignupComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,                            
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    MDBBootstrapModule.forRoot()
  ],

  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
