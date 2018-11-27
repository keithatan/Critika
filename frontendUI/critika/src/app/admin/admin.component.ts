import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';
import { Submission } from '../models/submissions.model';
import { SubmissionService } from '../services/submissions.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  allUsers:Profile[];
  allReportedComments:Submission[];

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
        console.log(user);
        this.allUsers[i] = user;
      }
    })

    this.subService.getAllReportedComments().then((data) =>{
      let i:number;
      let response = [];

      response.push(data);

      this.allReportedComments = new Array(response[0].length);

      for(i = 0; i < response[0].length;i++){
        let reportedComment = new Submission(response[0][i]);
        this.allReportedComments[i] = reportedComment;
      }
    })
  }

}
