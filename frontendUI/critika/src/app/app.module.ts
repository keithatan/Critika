import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router'
import { AppRoutes } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { SearchPipe } from './filter.pipe'


//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MyQueueComponent } from './my-queue/my-queue.component';
import {AddSubComponent} from './profile/add-sub/add-sub.component';
import { ProfileComponent } from './profile/profile.component';
import {CategoriesComponent} from './categories/categories.component';
import { AdminComponent } from './admin/admin.component'

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/auth.interceptor';

import { CritiqueFormComponent } from './home/critique-form/critique-form.component';
import { MySubmissionsComponent } from './my-submissions/my-submissions.component';
import { SpendCoinsComponent } from './profile/spend-coins/spend-coins.component';
import { EditSubComponent } from './my-submissions/edit-sub/edit-sub.component';

import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EditAccountComponent } from './edit-account/edit-account.component';


@NgModule({
  declarations: [
    AppComponent,
    AddSubComponent,
    DashboardComponent,
    HomeComponent,
    MyQueueComponent,
    ProfileComponent,
    CategoriesComponent,
    SpendCoinsComponent,
    EditSubComponent,
    MySubmissionsComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    CritiqueFormComponent,
    SearchPipe,
    EditProfileComponent,
    FeedbackComponent,
    EditAccountComponent
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
  bootstrap: [AppComponent],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
