import { Component, OnInit, Input } from '@angular/core';
import { Submission } from '../../models/submissions.model';
import { SubmissionService } from '../../services/submissions.service';
@Component({
  selector: 'app-view-sub',
  templateUrl: './view-sub.component.html',
  styleUrls: ['./view-sub.component.scss']
})
export class ViewSubComponent implements OnInit {
  @Input('childSubmission') sub:Submission;
  chosenSubmission: Submission;
  renderComponent: string;

  edit: boolean;

  constructor(public subService:SubmissionService) { 
    this.renderComponent = "";
    this.edit = false;
  }

  renderEditSub(sub:Submission) {
    if (this.edit == false) {
      this.edit = true;
    }
    if (this.edit == true) {
      this.edit = false;
    }
    if (this.renderComponent == 'EditSub'){
      this.renderComponent = "";

    }
    else{
      this.renderComponent = 'EditSub';
      this.chosenSubmission = sub;
  }
}

  ngOnInit() {
    
  }

}
