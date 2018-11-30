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
  submitted:boolean = false;
  // tslint:disable-next-line:no-input-rename
  @Input('submission') chosenSubmission: Submission;
  @Output() returnToParent = new EventEmitter<string>();

  // We need to call back to parent that we need ot update



  constructor(public feedbackService: FeedbackService, private formBuilder: FormBuilder) {
    this.renderComponent = '';
  }
  renderComponent: string;
  feedback: string;
  comment: string;

  critique(form: NgForm) {
    console.log(this.chosenSubmission.submissionName);
    this.submitted = true;
    if (this.critiqueForm.invalid) {
      return;
    }
    this.feedbackService.giveFeedback(form.value.wentWrong, form.value.improved, form.value.wentWell, this.chosenSubmission.username,  this.chosenSubmission.submissionName, false, this.chosenSubmission.submissionID).subscribe((response) => {
        console.log('Worked');
        this.returnToParent.emit('dash');
      }),((err) => {
        console.log('err');
      });
  }

  ngOnInit() {
    console.log(this.chosenSubmission);
    this.critiqueForm = this.formBuilder.group({
      wentWell: ['', Validators.required],
      wentWrong: ['', Validators.required],
      improved: ['', Validators.required]
    })
  }

  get form() { return this.critiqueForm.controls; }

  returnToDashboard() {
    this.returnToParent.emit('dash');
  }

  sendFeedback(){
    console.log(this.wentWell);
  }

}
