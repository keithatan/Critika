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
  edit: boolean;

  constructor(public profileService: ProfileService) {
    this.renderComponent = "";
    this.coins = 4;
    this.edit = false;
  }

  renderComponent: String;

  renderAddSub() {
    this.renderComponent = "AddSub"
  }

  renderSpendCoins() {
    this.renderComponent = "SpendCoins"
  }

  renderEditSub() {
    this.renderComponent = "EditSub"
  }
  renderEditProfile() {
    if (this.edit == false) {
      this.edit = true;
    }
    if (this.edit == true) {
      this.edit = false;
    }
    if (this.renderComponent == "EditProfile"){
      this.renderComponent = "";

    }
    else{
    this.renderComponent = "EditProfile"
  }
  }

  ngOnInit() {
    this.profileService.getProfile().then((response) => {
      this.profile = new Profile(response);
      this.r = this.profile.rating/this.profile.ratingNum;
      /*
      const v = response["rating"];
      console.log(v);
      */
      console.log(response);
      console.log(this.profile)
    })

  }

  getChildEvent(event:string){
    this.profileService.getProfile().then((response) => {
      this.profile = new Profile(response);
      this.r = this.profile.rating/this.profile.ratingNum;
      /*
      const v = response["rating"];
      console.log(v);
      */
      console.log(response);
      console.log(this.profile)
    })
  }

}
