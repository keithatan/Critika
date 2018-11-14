import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../../services/submissions.service'
@Component({
  selector: 'app-edit-sub',
  templateUrl: './edit-sub.component.html',
  styleUrls: ['./edit-sub.component.scss']
})
export class EditSubComponent implements OnInit {

  constructor(public subService:SubmissionService) { }

  text: string;
  SubName: string;

  sendEdits() {
    this.subService.editSubmission(this.SubName, this.text);
  }

  ngOnInit() {
  }

}
