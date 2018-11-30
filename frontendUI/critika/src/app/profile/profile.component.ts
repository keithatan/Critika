import { Component, OnInit } from '@angular/core';
import { renderComponent } from '@angular/core/src/render3';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';
import { NgIf } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  coins: number;
  profile: Profile;
  r:number;
  
  
  constructor(public profileService: ProfileService) {
    this.renderComponent = "";
    this.coins = 4;
  
  }
  
  renderComponent: string;
  
  renderEditProfile() {
      this.renderComponent = "EditProfile";
  }
  
  ngOnInit() {
    this.profileService.getProfile().then((response) => {
      this.profile = new Profile(response);
      let p:number = this.profile.ratingNum - 1;
      this.r = this.profile.rating/p;
      /*
      const v = response["rating"];
      console.log(v);
      */
      console.log(response);
      console.log(this.profile);
     
    })
    
  }
  
  getChildEvent(event:string){
    this.renderComponent = "";
    this.profileService.getProfile().then((response) => {
      this.profile = new Profile(response);
      let p:number = this.profile.ratingNum - 1;
      this.r = this.profile.rating/p;
      /*
      const v = response["rating"];
      console.log(v);
      */
      console.log(response);
      console.log(this.profile);
     
    })
  }
  
}
