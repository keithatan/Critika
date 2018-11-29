import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { SearchPipe } from './filter.pipe'
import { UserSearchPipe } from './UserFilter.pipe'


//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MyQueueComponent } from './my-queue/my-queue.component';
import {AddSubComponent} from './my-submissions/add-sub/add-sub.component';
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
import { AccountComponent } from './account/account.component';
import { RateFeedbackComponent } from './feedback/rate-feedback/rate-feedback.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ViewSubComponent } from './my-submissions/view-sub/view-sub.component';


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
    AccountComponent,
    RateFeedbackComponent,
    SidenavComponent,
    UserSearchPipe,
    ViewSubComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,                            
    ReactiveFormsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
    
  ],

  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
