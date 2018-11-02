import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  renderComponent: String = "";
  private authStatusSub : Subscription;
  userIsAuth = false


  constructor(private authService:AuthService){}


  renderHome(){
    this.renderComponent = "home";
  }
  ngOnDestroy() {
}

  renderProfile(){
    this.renderComponent = "profile";
  
  }

  renderMySubmissions() {
    this.renderComponent = "my-submissions";

  }

  renderCategories(){
    this.renderComponent = "categories";
  }

  renderAdmin() {
    this.renderComponent = "Admin";
  }


  ngOnInit(){
    this.authStatusSub = this.authService.getAuthStatus().subscribe(isAuthenticated =>{
      this.userIsAuth = isAuthenticated;
    })
  }



}
