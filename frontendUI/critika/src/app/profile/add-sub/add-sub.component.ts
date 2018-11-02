import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../../my-submissions/my-submissions.service'

@Component({
  selector: 'app-add-sub',
  templateUrl: './add-sub.component.html',
  styleUrls: ['./add-sub.component.scss']
})
export class AddSubComponent implements OnInit {

  constructor(public subService:SubmissionService) { }
  Link: string
  SubName: string
  feedback: string
  SpendCoin: boolean

  sendSubmission() {
    this.subService.addSubmission(this.SubName, this.Link, "music", localStorage.getItem('user'));

  }

  ngOnInit() {
  }

}