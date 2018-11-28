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

  critique(form: NgForm) {
    if (this.critiqueForm.invalid) {
      return;
    }
    console.log(this.chosenSubmission.submissionName);
    // tslint:disable-next-line:max-line-length
    this.feedbackService.giveFeedback(form.value.bad, form.value.work, form.value.good, this.chosenSubmission.username,  this.chosenSubmission.submissionName, false).subscribe(
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

}
