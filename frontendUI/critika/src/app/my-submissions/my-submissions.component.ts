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
  renderComponent: string;

  edit: boolean;
  Text: string;


  constructor(public subService:SubmissionService) { 
    this.renderComponent = "";
    this.edit = false;
  }

  getSubmissions(){

  }
  renderFileReport() {
        this.renderComponent = "file-report";
    }

  renderEditSub() {
    if (this.edit == false) {
      this.edit = true;
    }
    if (this.edit == true) {
      this.edit = false;
    }
    if (this.renderComponent == 'EditSub'){
      this.renderComponent = "";

    }
    else{
      this.renderComponent = 'EditSub';
  }
    
    //this.Text = text

  }

  ngOnInit() {
    this.subService.getSubmissions().then((data) =>{
      let i:number;

      let response = [];
      response.push(data);


      this.mySubmissions = new Array(response[0].length)

      for(i = 0;i< response[0].length; i+=1) {
          let submission = new Submission(response[0][i])
          this.mySubmissions[i] = submission;
       }
       console.log(response);
      });
  }

}
