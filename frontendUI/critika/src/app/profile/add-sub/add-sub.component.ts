import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-sub',
  templateUrl: './add-sub.component.html',
  styleUrls: ['./add-sub.component.scss']
})
export class AddSubComponent implements OnInit {

  constructor() { }
  Link: String
  SubName: String
  feedback: String
  SpendCoin: boolean

  sendSubmission() {
    console.log('yeeeet')
  }

  ngOnInit() {
  }

}