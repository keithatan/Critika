import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {Submission} from '../../models/submissions.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-critique-form',
  templateUrl: './critique-form.component.html',
  styleUrls: ['./critique-form.component.scss']
})
export class CritiqueFormComponent implements OnInit {
  critiqueForm: FormGroup;
  wentWell: string;
  wentWrong: string;
  improved: string;
  // tslint:disable-next-line:no-input-rename
  @Input('submission') chosenSubmission: Submission;
  @Output() returnToParent = new EventEmitter<string>();

  // We need to call back to parent that we need ot update



  constructor(public feedbackService: FeedbackService) {
    this.renderComponent = '';
  }
  renderComponent: string;
  feedback: string;
  comment: string;

  critique() {
    console.log(this.chosenSubmission.submissionName);
    // tslint:disable-next-line:max-line-length
    this.feedbackService.giveFeedback(this.wentWrong, this.improved,this.wentWell, this.chosenSubmission.username,  this.chosenSubmission.submissionName, false, this.chosenSubmission.submissionID).subscribe(
      (response) => {
        console.log('Worked');

      },
      (err) => {
        console.log('err');
      });
  }

  ngOnInit() {
    console.log(this.chosenSubmission);
  }

  returnToDashboard() {
    this.returnToParent.emit('dash');
  }

  sendFeedback(){
    console.log(this.wentWell);
  }

}
