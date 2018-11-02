import { Component, OnInit } from '@angular/core';
import {SubmissionService} from '../my-submissions/my-submissions.service'
import {Submission} from '../my-submissions/my-submissions.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  possibleSubs:Submission[];


  constructor(public subService:SubmissionService) {
    this.renderComponent = "";
  }
  renderComponent: String;

  renderCritiqueForm() {
    this.renderComponent = "critique-form";
  }

  Link: "Submission";

  ngOnInit() {
    this.possibleSubs = this.subService.getAvailable();
  }

}


