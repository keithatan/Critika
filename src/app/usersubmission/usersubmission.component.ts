import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Submission } from '../models/submissions.model';
import { SubmissionService } from '../services/submissions.service';

@Component({
  selector: 'app-usersubmission',
  templateUrl: './usersubmission.component.html',
  styleUrls: ['./usersubmission.component.scss']
})
export class UsersubmissionComponent implements OnInit {

  tableElements = ['User', 'Comment', 'Report'];
  @Input('childSubmission') sub:Submission;
  @Output() returnToParent = new EventEmitter<string>();
  chosenSubmission: Submission;
  renderComponent: string;
  comment: string;

  edit: boolean;

  constructor(public subService:SubmissionService) { 
    this.renderComponent = "";
    this.edit = false;
  }

  sendReport(submission:Submission, commentMessage:string, comment){
    // console.log(sub)
    this.subService.reportComment(comment._id, submission.submissionID, commentMessage).then((res) => {
      console.log(res)
    });
  }

addComment(sub){
  console.log("id: " + sub._id)
  console.log("comment: " + this.comment)
  this.subService.addComment(this.comment, sub._id).then((sub) => {
    console.log(sub)
  })
  this.returnToParent.emit('reload');
}

getChildEvent(event:string){
  this.returnToParent.emit('reload');
}

close(){
  this.returnToParent.emit('reload');
}

  ngOnInit() {
    console.log(this.sub)
  }

}
