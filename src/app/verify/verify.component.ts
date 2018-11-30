import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VerifyData } from './verify-data.model'

@Component({
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})

export class VerifyComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }
  verifyAccountForm: FormGroup;
  submitted: boolean = false;
  response:string = "NULL";
  ngOnInit() {
    this.verifyAccountForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required]
    });
  }

  get form() { return this.verifyAccountForm.controls }
  get response_msg() { return this.response }

  onVerifyAccount(form: NgForm) {
    this.submitted = true;
    if (this.verifyAccountForm.invalid) {
      return;
    }
    console.log(form.value);

    const data: VerifyData = { email: form.value.email, verificationNum: form.value.number }
    // Post New Changes
    this.http.post("https://critika-backend.herokuapp.com/user/verify-email", data)
      .subscribe(response => {
        console.log(response);
        this.response = "complete";
      },
        error => {
          console.log(error)
          if (error.error.message == "Verification code does not match") {
            this.response = "noMatch";
          }
          else if (error.error.message == "Email does not exist in our records") {
            this.response = "noEmail";
          }
          else {
            this.response = "fatalError";
          }
        });
  }
}