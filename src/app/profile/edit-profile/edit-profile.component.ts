import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})


export class EditProfileComponent implements OnInit {
  @Input('childProfile') childProfile: Profile;
  @Output() returnToParent = new EventEmitter<string>();
  boop: 'lmao';
  view:boolean;
  constructor(private proService:ProfileService) { 
    this.view = false;
  }
  aboutMe: '';
  homePage: '';
  location: '';
  occupation: '';

  renderComponent: String;
  renderProfile() {
    if (this.view == false){
       this.view = true;
    }
    else if (this.view == true) {
      this.view = false;
    }
    this.renderComponent = "Profile";
  }

  submitChanges(){
    this.proService.editProfile(this.homePage, this.location, this.occupation, this.aboutMe)
    .subscribe ((response) => {
      console.log(response);
      this.view = true;
      this.returnToParent.emit('reload')
    },
    (err) =>{
      console.log(err)
      // put a errror notify
    })
  }

  ngOnInit() {
  }

}
