import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';


//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MyQueueComponent } from './my-queue/my-queue.component';
import {AddSubComponent} from './profile/add-sub/add-sub.component';
import { ProfileComponent } from './profile/profile.component';
import { MySubmissionsComponent } from './my-submissions/my-submissions.component';
import { SpendCoinsComponent } from './profile/spend-coins/spend-coins.component';

@NgModule({
  declarations: [
    AppComponent,
    AddSubComponent,
    DashboardComponent,
    HomeComponent,
    MyQueueComponent,
    ProfileComponent,
    MySubmissionsComponent,
    SpendCoinsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    MDBBootstrapModule.forRoot()
    //AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
