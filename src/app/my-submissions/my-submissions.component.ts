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

  renderComponent: string;
  Text: string


  constructor(public subService:SubmissionService) { 
  }

  getSubmissionsPls(){
    this.mySubmissions = this.subService.getSubmissions();
  }

  renderEditSub() {
    this.renderComponent = 'EditSub';
    //this.Text = text

  }

  ngOnInit() {
  }

}
