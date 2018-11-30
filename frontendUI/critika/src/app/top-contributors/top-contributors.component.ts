import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Account } from '../models/account.model'
import { AuthData } from '../auth/auth-data.model'

@Component({
  templateUrl: './top-contributors.component.html',
  styleUrls: ['./top-contributors.component.scss']
})

export class TopContributorsComponent implements OnInit {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  ngOnInit() {

  }
}