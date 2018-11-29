import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';
import { Submission } from '../models/submissions.model';
import { SubmissionService } from '../services/submissions.service';
import { Category } from '../categories/categories.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  allUsers:Profile[];
  allReporteds:Comment[];
  allSuggestedCategories:Category[];
  UserToBeBanned: '';
  UserToBeRestored: '';
  UserToBeAdmin: '';

  constructor(public proService:ProfileService,
              public subService:SubmissionService) { }


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
        this.allUsers[i] = user;
      }
    })

    this.subService.getAllReportedComments().then((data) =>{
      let i:number;
      let response = [];

      response.push(data);

      this.allReporteds = new Array(response[0].length);

      for(i = 0; i < response[0].length;i++){
        let reportedComment = new Comment(response[0][i].comments);
        console.log(reportedComment);
        this.allReporteds[i] = reportedComment;
      }
    })
  }

  BanEm() {
    this.proService.banUser(this.UserToBeBanned).subscribe((res)=>{
      console.log(res)
    })
  }

  RestoreEm() {
    this.proService.restoreUser(this.UserToBeRestored).subscribe((res)=>{
      console.log(res)
    })
  }

  AdminEm() {
    this.proService.AdminUser(this.UserToBeAdmin).subscribe((res)=>{
      console.log(res)
    })
  }

}
