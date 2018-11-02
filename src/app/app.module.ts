import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
<<<<<<< HEAD
import {CategoriesComponent} from './categories/categories.component';
=======
import { AdminComponent } from './admin/admin.component'

>>>>>>> c56d833469ebe98364844de8bb3016ac53f88b7c
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
    CategoriesComponent,
    SpendCoinsComponent,
    EditSubComponent,
    MySubmissionsComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent
    
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
