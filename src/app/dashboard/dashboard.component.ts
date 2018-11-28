import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../services/profile.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  renderComponent: String = "home";
  private authStatusSub : Subscription;
  userIsAuth = false
  username:string = localStorage.getItem('user');
  coins:string;


  constructor(private authService:AuthService, private profileService:ProfileService){
    this.username = localStorage.getItem('user');
    this.profileService.getProfile().then((response) => {  
      const v = response["coins"];
      this.coins = v;
    })
  }


  renderEditAccount() {
    this.renderComponent = "edit-account";
  }

  renderHome() {
    this.renderComponent = "home";
  }
  ngOnDestroy() {
  }

  updateInformation(update:string){
    // Will use this later to grab events to update profile picture and coins
  }

  renderProfile() {
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

  renderFeedback() {
    this.renderComponent = "feedback";
  }


  ngOnInit(){
    this.authStatusSub = this.authService.getAuthStatus().subscribe(isAuthenticated =>{
      this.userIsAuth = isAuthenticated;
    })
  }



}
