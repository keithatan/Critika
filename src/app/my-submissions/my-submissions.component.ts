import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../services/submissions.service';
import { Submission } from '../models/submissions.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-my-submissions',
  templateUrl: './my-submissions.component.html',
  styleUrls: ['./my-submissions.component.scss']
})
export class MySubmissionsComponent implements OnInit {
  mySubmissions:Submission[];
  renderComponent: string = "";

  Text: string


  constructor(public subService:SubmissionService) { 
  }

  getSubmissions(){

  }
  renderFileReport() {
        this.renderComponent = "file-report";
    }

  renderEditSub() {
    this.renderComponent = 'EditSub';
    //this.Text = text

  }

  ngOnInit() {
    this.subService.getSubmissions().then((data) =>{
      let i:number;

      let response = [];
      response = [
      {
        submissionName: '',
        submissionText: '',
        username: '',
        category:'',
        coins: '',
        recuser: ''
      }
      ];

      response.push(data);

      this.mySubmissions = new Array(response.length)

      for(i = 0;i< response.length; i+=1) {
          let submission = new Submission(response[i])
          this.mySubmissions[i] = submission;
       }
      });
  }

}
