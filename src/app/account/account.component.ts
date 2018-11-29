import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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
  submitted_username: boolean = false;
  submitted_email: boolean = false;
  submitted_password: boolean = false;
  ngOnInit() {
    this.getAccountInfo()
    this.changeUsernameForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
    this.changeEmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  get form_username() { return this.changeUsernameForm.controls }
  get form_mail() { return this.changeEmailForm.controls }
  get form_password() { return this.changePasswordForm.controls }

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
    this.submitted_email = true;
    this.submitted_username = false;
    if (this.changeEmailForm.invalid) {
      return;
    }
    console.log(form.value)
  }

  onSubmitUsername(form: NgForm) {
    this.submitted_username = true;
    this.submitted_email = false;
    if (this.changeUsernameForm.invalid) {
      return;
    }
    console.log(form.value)
  }

  onSubmitPassword(form: NgForm) {
    this.submitted_password = true;
    this.submitted_email = false;
    this.submitted_username = false;
    if (this.changePasswordForm.invalid) {
      return;
    }
    console.log(form.value)
  }

}
