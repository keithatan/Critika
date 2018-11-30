import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../services/submissions.service'
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user.model'
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Account } from '../models/account.model'
import { AuthData } from '../auth/auth-data.model'

@Component({
  templateUrl: './top-contributors.component.html',
  styleUrls: ['./top-contributors.component.scss']
})

export class TopContributorsComponent implements OnInit {
  constructor(public subservice: SubmissionService, private http: HttpClient, private formBuilder: FormBuilder) { }
  tableElements = ['User', 'No. Submissions', 'No. Critiques', 'Rating'];
  usersForward: User[];
  usersReverse: User[];

  ngOnInit() {
    this.getLeaderBoard();
    this.getLeaderBoardReverse();
  }

  getLeaderBoard() {
    this.subservice.getLeaderboard().then((users) => {
      let i: number = 0;
      let length: number = Object.keys(users).length;
      this.usersForward = new Array(length);
      for (let user in users) {
        // console.log(users[user].username)
        let truncated_user = new User(users[user]);
        this.usersForward[i++] = truncated_user;
      }
    })
  }

  getLeaderBoardReverse() {
    this.subservice.getLeaderboardReverse().then((users) => {
      let i: number = 0;
      let length: number = Object.keys(users).length;
      this.usersReverse = new Array(length);
      for (let user in users) {
        let truncated_user = new User(users[user]);
        this.usersReverse[i++] = truncated_user;
      }
    })
  }
}