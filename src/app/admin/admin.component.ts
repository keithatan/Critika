import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  allUsers:Profile[];

  constructor(public proService:ProfileService) { }

  getUsers(){

  }
  ngOnInit() {
    this.proService.getAllUsers().then((data) =>{
      let i:number;
      let response = [];

      response.push(data);

      this.allUsers = new Array(response[0].length);

      for(i = 0; i < response[0].length;i++){
        let user = new Profile(response[0][i]);
        console.log(user);
        this.allUsers[i] = user;
      }
    })
  }

}
