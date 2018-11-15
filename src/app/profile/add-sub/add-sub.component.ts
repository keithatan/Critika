import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../../services/submissions.service'

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
  Category: string
  SpendCoin: boolean

  sendSubmission() {
    this.subService.addSubmission(this.SubName, this.Link, this.Category, localStorage.getItem('user'));

  }

  ngOnInit() {
  }

}