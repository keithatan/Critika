import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Submission } from '../../models/submissions.model';
import { SubmissionService } from '../../services/submissions.service'
@Component({
  selector: 'app-edit-sub',
  templateUrl: './edit-sub.component.html',
  styleUrls: ['./edit-sub.component.scss']
})
export class EditSubComponent implements OnInit {
  @Input('childSubmission') childSubmission: Submission;
  @Output() returnToParent = new EventEmitter<string>();
  boop: 'lmao';
  view:boolean;
  constructor(private subService:SubmissionService) { 
    this.view = false;
  }

  
  subName: '';
  text: '';
  category: '';

  renderComponent: String;
  renderSubmission() {
    if (this.view == false){
       this.view = true;
    }
    else if (this.view == true) {
      this.view = false;
    }
    this.renderComponent = "Submission";
  }

  sendEdits(){
    this.subService.editSubmission(this.subName, this.text, this.category)
    .subscribe ((response) => {
      console.log(response);
      this.returnToParent.emit('reload')
    },
    (err) =>{
      console.log(err)
      // put a errror notify
    })
  }

  ngOnInit() {
  }

}
