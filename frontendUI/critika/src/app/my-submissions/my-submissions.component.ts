import { Component, OnInit } from '@angular/core';
import { SubmissionService } from './my-submissions.service';
import { Submission } from './my-submissions.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-my-submissions',
  templateUrl: './my-submissions.component.html',
  styleUrls: ['./my-submissions.component.scss']
})
export class MySubmissionsComponent implements OnInit {
  mySubmissions:Submission[];


  constructor(public subService:SubmissionService) { 
    this.getSubmissionsPls();
  }

  getSubmissionsPls(){
    this.mySubmissions = this.subService.getSubmissions();
  }

  ngOnInit() {
    this.getSubmissionsPls();
    console.log("init called")
  }

}
