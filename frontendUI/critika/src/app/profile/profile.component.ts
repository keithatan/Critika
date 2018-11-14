import { Component, OnInit } from '@angular/core';
import { renderComponent } from '@angular/core/src/render3';
import {Profile} from './profile.model';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  coins:number;
  profile:Profile;

  constructor( public profileService:ProfileService) { 
    this.renderComponent = "";
    this.coins = 4;
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

  ngOnInit() {


    this.profileService.getProfile().then((response)=>{
      this.profile = new Profile(response);
      console.log(response)
      console.log(this.profile)
    })

  }

}
