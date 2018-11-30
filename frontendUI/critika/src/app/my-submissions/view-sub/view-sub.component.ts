import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Submission } from '../../models/submissions.model';
import { SubmissionService } from '../../services/submissions.service';
@Component({
  selector: 'app-view-sub',
  templateUrl: './view-sub.component.html',
  styleUrls: ['./view-sub.component.scss']
})
export class ViewSubComponent implements OnInit {
  tableElements = ['User', 'Comment', 'Report'];
  @Input('childSubmission') sub: Submission;
  @Output() returnToParent = new EventEmitter<string>();
  chosenSubmission: Submission;
  renderComponent: string;
  comment: string = "";
  response: string = "NULL";
  edit: boolean;
  commentBlank:boolean = false;

  constructor(public subService: SubmissionService) {
    this.renderComponent = "";
    this.edit = false;
  }

  get response_msg() { return this.response; }
  get is_comment_blank() { return this.commentBlank; }

  sendReport(submission: Submission, commentMessage: string, comment) {
    // console.log(sub)
    this.subService.reportComment(comment._id, submission.submissionID, commentMessage).then((res) => {
      this.response = res["message"];
    });
  }

  renderEditSub(sub: Submission) {

    this.renderComponent = 'EditSub';
    this.chosenSubmission = sub;

  }

  addComment(sub) {
    console.log(sub.submissionID)

    if (this.comment == "") {
      this.commentBlank = true;
      return;
    }
    this.commentBlank = false;
    this.subService.addComment(this.comment, sub.submissionID).then((sub) => {
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
