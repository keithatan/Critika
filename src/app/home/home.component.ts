import { Component, OnInit } from '@angular/core';
import {SubmissionService} from '../services/submissions.service'
import {Submission} from '../models/submissions.model'
import { timer } from 'rxjs';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  possibleSubs:Submission[];
  private timer;

  constructor(public subService:SubmissionService) {
    this.renderComponent = "";
    this.timer;
  }
  renderComponent: String;

  renderCritiqueForm() {
    this.renderComponent = "critique-form";
  }

  Link: "Submission";

  ngOnInit() {
    this.displayAvailable();
  }

  displayAvailable(){
    this.subService.getAvailable().then((submissions)=>{

      let i:number;

      this.possibleSubs = new Array(5)
      let count:number = 0;
      for(i = 0; i < 5; i++) {
          let submission = new Submission(submissions[i])
            this.possibleSubs[i] = submission;
       }
      //console.log(this.possibleSubs)
    }).then(() => {
      setInterval(this.checkAvailable.bind(this), 2000);
    })
  }

  checkAvailable(){
    let i:number;
    for(i = 0; i < 5; i++){
      if(this.possibleSubs[i].numberOfCritiquesRecieved >= 3){
        this.replaceSubmission(this.possibleSubs[i])
      }
    }
  }

  replaceSubmission(submission){
    let ten:number = 10;
    this.timer = timer(1000,1000)
    this.timer = setInterval(() => {
      // console.log(ten--)
      // if(ten < 0){
      //   ten = 10;
      // }
    },10)
    // console.log('done')
    // console.log(this.possibleSubs)
    this.subService.setUnavailable(submission);
  }

  

}


