import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Submission } from '../../models/submissions.model';
import { SubmissionService } from '../../services/submissions.service';
@Component({
  selector: 'app-view-sub',
  templateUrl: './view-sub.component.html',
  styleUrls: ['./view-sub.component.scss']
})
export class ViewSubComponent implements OnInit {
  @Input('childSubmission') sub:Submission;
  @Output() returnToParent = new EventEmitter<string>();
  chosenSubmission: Submission;
  renderComponent: string;

  edit: boolean;

  constructor(public subService:SubmissionService) { 
    this.renderComponent = "";
    this.edit = false;
  }

  sendReport(submission:Submission, commentMessage:string, comment:Object){
    // console.log(sub)
    this.subService.reportComment(submission.submissionName, commentMessage, comment).then((res) => {
      console.log(this.sub)
    });
  }

  renderEditSub(sub:Submission) {
   
      this.renderComponent = 'EditSub';
      this.chosenSubmission = sub;
  
}

getChildEvent(event:string){
  this.returnToParent.emit('reload');
}

  ngOnInit() {
    console.log(this.sub)
  }


}
