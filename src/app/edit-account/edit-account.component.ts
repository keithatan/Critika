import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Account } from '../models/account.model'

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})

export class EditAccountComponent implements OnInit {
  constructor(private http: HttpClient) { }
  username: string;
  email: string;
  account: Account;
  ngOnInit() {
    this.getAccountInfo()
  }


  getAccountInfo() {
    this.http.get("http://localhost:5000/user/account").subscribe(response => {
      this.account = new Account(response);
      this.username = this.account.username;
      this.email = this.account.email;
    }),
      error => {
        console.log(error)
      }
  }

}
