import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Account } from '../models/account.model'
import { AuthData } from '../auth/auth-data.model'

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
  changeEmailForm: FormGroup;
  changePasswordForm: FormGroup;
  changeSecurityQuestionForm: FormGroup;
  submitted_email: boolean = false;
  submitted_password: boolean = false;
  submitted_security_question: boolean = false;
  response: string = "NULL";
  questions = ["What is your mother's maiden name?", 'What is your favorite drink?', 'What elementary school did you attend?']
  ngOnInit() {
    this.getAccountInfo()
    this.changeEmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
    this.changeSecurityQuestionForm = this.formBuilder.group({
      securityanswer: ['', Validators.required],
      securityquestion: ["What is your mother's maiden name?"]
    });
  }

  // custom validator for checking passwords
  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  // get form_username() { return this.changeUsernameForm.controls }
  get form_mail() { return this.changeEmailForm.controls }
  get form_password() { return this.changePasswordForm.controls }
  get form_security_question() { return this.changeSecurityQuestionForm.controls }

  get response_msg() { return this.response }

  getAccountInfo() {
    this.http.get("https://critika-backend.herokuapp.com/user/account").subscribe(response => {
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
    this.submitted_password = false;
    this.submitted_security_question = false;
    if (this.changeEmailForm.invalid) {
      return;
    }
    console.log(form.value)

    // Post New Changes
    const auth: AuthData = { email: form.value.email, username: "", password: "", securityquestionanswer: "", securityquestion: "" }
    this.http.post("https://critika-backend.herokuapp.com/user/change-email", auth)
      .subscribe(response => {
        this.response = "complete_email";
      },
        error => {
          console.log(error)
          if (error.error.message == "User data is incomplete") {
            this.response = "incomplete";
          }
          else {
            this.response = "fatalError";
          }
        });
  }

  onSubmitPassword(form: NgForm) {
    this.submitted_password = true;
    this.submitted_email = false;
    this.submitted_security_question = false;
    if (this.changePasswordForm.invalid) {
      return;
    }
    console.log(form.value)

    // Post New Changes
    const auth: AuthData = { email: "", username: "", password: form.value.password, securityquestionanswer: "", securityquestion: "" }
    this.http.post("https://critika-backend.herokuapp.com/user/change-password", auth)
      .subscribe(response => {
        this.response = "complete_password";
      },
        error => {
          console.log(error)
          this.response = "fatalError";
        });
  }

  onSubmitSecurityQuestion(form: NgForm) {
    this.submitted_security_question = true;
    this.submitted_email = false;
    this.submitted_password = false;
    if (this.changeSecurityQuestionForm.invalid) {
      return;
    }
    console.log(form.value.securityanswer)
    console.log(form.value.securityquestion)

    // Post New Changes
    const auth: AuthData = { email: "", username: "", password: "", securityquestionanswer: form.value.securityanswer, securityquestion: form.value.securityquestion }
    this.http.post("https://critika-backend.herokuapp.com/user/change-security", auth)
      .subscribe(response => {
        console.log(response);
        this.response = "complete_security";
      },
        error => {
          console.log(error)
          if (error.error.message == "User data is incomplete") {
            this.response = "incomplete";
          }
          else if (error.error.message == "Error changing security question and answer") {
            this.response = "fatalError";
          }
          else {
            this.response = "fatalError";
          }
        });
  }

}
