import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';


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
  submitted:boolean = false;
  editProfileForm: FormGroup;
  constructor(private proService:ProfileService, private formBuilder: FormBuilder) { 
    this.view = false;
  }
  aboutMe: '';
  homePage: '';
  location: '';
  occupation: '';

  renderComponent: String;
  renderProfile() {
  
    this.returnToParent.emit('goback');
  }

  get form() { return this.editProfileForm.controls; }

  submitChanges(form: NgForm) {
    this.submitted = true;
    if (this.editProfileForm.invalid) {
      return;
    }
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
    console.log("rendered edit");
    this.editProfileForm = this.formBuilder.group({
      aboutMe: ['', Validators.required], 
      homePage: ['', Validators.required], 
      location: ['', Validators.required],
      occupation: ['', Validators.required]
    })
  }

}
