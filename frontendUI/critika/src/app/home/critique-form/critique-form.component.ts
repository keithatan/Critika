import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import {Submission} from '../../models/submissions.model'
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-critique-form',
  templateUrl: './critique-form.component.html',
  styleUrls: ['./critique-form.component.scss']
})
export class CritiqueFormComponent implements OnInit {
  @Input('submission') chosenSubmission: Submission;
  @Output() returnToParent = new EventEmitter<string>();

  // We need to call back to parent that we need ot update



  constructor(public feedbackService:FeedbackService) { 
    this.renderComponent = "";
  }
  renderComponent: string;
  feedback: string;
  comment: string;

  critique(){
    console.log(this.chosenSubmission.submissionName);
    this.feedbackService.giveFeedback("testmessge", "test", this.chosenSubmission.username,  this.chosenSubmission.submissionName, false);
  }

  ngOnInit() {

    console.log(this.chosenSubmission)
  }

  returnToDashboard(){
    this.returnToParent.emit("dash");
  }

}
