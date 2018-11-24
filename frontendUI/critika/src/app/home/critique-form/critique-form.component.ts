import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import {Submission} from '../../models/submissions.model'

@Component({
  selector: 'app-critique-form',
  templateUrl: './critique-form.component.html',
  styleUrls: ['./critique-form.component.scss']
})
export class CritiqueFormComponent implements OnInit {
  @Input('submission') chosenSubmission: Submission;
  @Output() returnToParent = new EventEmitter<string>();

  constructor() { 
    this.renderComponent = "";
  }
  renderComponent: string;
  feedback: string;
  comment: string;

  ngOnInit() {

    console.log(this.chosenSubmission)
  }

  returnToDashboard(){
    this.returnToParent.emit("dash");
  }

}
