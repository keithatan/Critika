import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Submission } from '../models/submissions.model';
import { SubmissionService } from '../services/submissions.service';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-usersubmission',
  templateUrl: './usersubmission.component.html',
  styleUrls: ['./usersubmission.component.scss']
})
export class UsersubmissionComponent implements OnInit {

  tableElements = ['User', 'Comment', 'Report'];
  @Input('childSubmission') sub: Submission;
  @Output() returnToParent = new EventEmitter<string>();
  chosenSubmission: Submission;
  renderComponent: string;
  comment: string = "";
  commentBlank: boolean = false;

  edit: boolean;

  constructor(public subService: SubmissionService) {
    this.renderComponent = "";
    this.edit = false;
  }

  sendReport(submission: Submission, commentMessage: string, comment) {
    // console.log(sub)
    this.subService.reportComment(comment._id, submission.submissionID, commentMessage).then((res) => {
      console.log(res)
    });
  }

  get is_comment_blank() { return this.commentBlank; }

  addComment(sub) {
    var submissionID;
    if (sub._id) {
      submissionID = sub._id;
    }
    else {
      submissionID = sub.submissionID;
    }
    console.log(sub)
    console.log("id: " + submissionID)
    console.log("comment: " + this.comment)
    if (this.comment == "") {
      this.commentBlank = true;
      return;
    }
    this.commentBlank = false;
    this.subService.addComment(this.comment, submissionID).then((sub) => {
      console.log(sub)
    })
    this.returnToParent.emit('reload');
  }

  getChildEvent(event: string) {
    this.returnToParent.emit('reload');
  }

  close() {
    this.returnToParent.emit('reload');
  }

  ngOnInit() {
    console.log(this.sub)
  }

}
