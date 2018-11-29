import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Account } from '../models/account.model'

@Component({
  selector: 'app-edit-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  username: string;
  email: string;
  account: Account;
  changeUsernameForm: FormGroup;
  changeEmailForm: FormGroup;
  changePasswordForm: FormGroup;
  submitted: boolean = false;
  ngOnInit() {
    this.getAccountInfo()
    this.changeUsernameForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
    this.changeEmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get form_username() { return this.changeUsernameForm.controls }
  get form_mail() { return this.changeEmailForm.controls }

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

  onSubmitEmail(form: NgForm) {
    this.submitted = true;
    console.log(form)
  }

  onSubmitUsername(form: NgForm) {
    this.submitted = true;
    console.log(form)
  }

  onSubmitPassword(form: NgForm) {
    this.submitted = true;
  }

}
