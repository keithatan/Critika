import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Submission } from '../../models/submissions.model';
import { SubmissionService } from '../../services/submissions.service';
import { CategoriesService } from '../../categories/categories.service';
import { NgForm, FormGroup, FormBuilder, } from '@angular/forms';


@Component({
  selector: 'app-edit-sub',
  templateUrl: './edit-sub.component.html',
  styleUrls: ['./edit-sub.component.scss']
})
export class EditSubComponent implements OnInit {
  @Input('childSubmission') sub: Submission;
  @Output() returnToParent = new EventEmitter<string>();
  boop: 'lmao';
  chosenSubmission: Submission
 
  constructor(private subService:SubmissionService) { 
    
  }

  link: '';
  description: '';
  feedback: '';


  sendEdits(sub){
    this.subService.editSubmission(this.link, this.description, this.feedback, sub.submissionID)
    .subscribe ((response) => {
      console.log(response);
       this.returnToParent.emit('reload')
    },
    (err) =>{
      console.log(err)
    })
    sub.submissionLink = this.link
    sub.submissionDescription = this.description
    sub.submissionText = this.feedback
  }

  

  ngOnInit() {
    
  
  }

}
