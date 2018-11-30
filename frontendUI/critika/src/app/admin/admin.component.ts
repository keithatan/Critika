import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';
import { Submission } from '../models/submissions.model';
import { SubmissionService } from '../services/submissions.service';
import { Category } from '../categories/categories.model';
import { CommentStmt } from '@angular/compiler';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  tableElements2 = ["Reported Comments", "User"];
  tableElements = ["User", "Status"];
  admin:boolean;

  allUsers:Profile[];
  allReportedComments:Submission[];
  allSuggestedCategories:Category[];
  UserToBeBanned: '';
  UserToBeRestored: '';
  UserToBeAdmin: '';
  foundReportedComments: Comment[];

  constructor(public proService:ProfileService,
              public subService:SubmissionService) { this.admin = true;}


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
      
    }).catch((err)=>{
      this.admin = false;

    })

    this.subService.getAllReportedComments().then((data) =>{
      let i:number;
      let response = [];

      response.push(data);

      this.allReportedComments = new Array(response[0].length);

      for(i = 0; i < response[0].length;i++){
        let reportedCommentSub = new Submission(response[0][i]);
        // console.log(reportedCommentSub);
        this.allReportedComments[i] = reportedCommentSub;
      }
      // console.log(this.allReportedComments)

      this.findReportedComments();
    })

    
    
  }

  findReportedComments() {
    let i:number;
    let j:number;
    let k:number;
    k = 0;

    this.foundReportedComments = new Array(this.allReportedComments.length)
    for(i = 0;i<this.allReportedComments.length;i++){
      for(j=0;j<this.allReportedComments[i].comments.length;j++){
        if(this.allReportedComments[i].comments[j].reported == true){
          let c = new Comment();
          c.username = this.allReportedComments[i].comments[j].user;
          c.reportedMessage = this.allReportedComments[i].comments[j].message
          console.log(this.allReportedComments[i].comments[j].user)
          this.foundReportedComments[k] = c;
          k = k + 1;
        }
      }
    }

    console.log(this.foundReportedComments)
  }

  updateUsers() {
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
