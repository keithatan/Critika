import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthData } from '../auth/auth-data.model'

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  submitted: boolean = false;
  response: string = "NULL";
  resetPasswordForm: FormGroup;
  questions = ["What is your mother's maiden name?", 'What is your favorite drink?', 'What elementary school did you attend?']

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      securityanswer: ['', Validators.required],
      securityquestion: ["What is your mother's maiden name?"]
    });
  }

  get form() { return this.resetPasswordForm.controls } A
  get response_msg() { return this.response }

  onSubmitReset(form: NgForm) {
    this.submitted = true;

    if (this.resetPasswordForm.invalid) {
      return;
    }

    const auth: AuthData = { email: form.value.email, username: "", password: "", securityquestionanswer: form.value.securityanswer, securityquestion: form.value.securityquestion }
    this.http.post("https://critika-backend.herokuapp.com/user/reset-password-email", auth)
      .subscribe(response => {
        console.log(response)
        this.response = "complete";
      },
        error => {
          console.log(error)
          if (error.error.message == "Security question answer does not match." || error.error.message == "Security question does not match.") {
            this.response = "noMatch";
          }
          else if (error.error.message == "Email does not exist in our records.") {
            this.response = "noEmail";
          }
          else {
            this.response = "fatalError";
          }
        });
  }
}