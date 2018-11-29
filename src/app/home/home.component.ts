import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../services/submissions.service'
import { Submission } from '../models/submissions.model'
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tableElements = ['Title', 'Description', 'User', 'Category', 'Critiques', 'Give Feedback'];
  possibleSubs: Submission[];
  chosen: Submission;
  TWENTY_FOUR_HOURS = 86400000;
  ONE_MINUTE = 60000;
  private timer;

  constructor(public subService: SubmissionService) {
    this.renderComponent = "";
    this.timer;
  }
  renderComponent: String;

  renderCritiqueForm(sub: Submission) {
    this.chosen = sub;
    this.renderComponent = "critique-form";
  }

  ngOnDestroy() {
    console.log('boooom')
  }

  Link: "Submission";

  ngOnInit() {
    this.displayAvailable();
  }

  getChildEvent(str: string) {
    this.renderComponent = str;
    this.displayAvailable();

  } t

  displayAvailable() {
    this.subService.getAvailable().then((submissions) => {
      console.log(submissions)
      let i: number = 0;

      console.log(Object.keys(submissions).length)
      let length: number = Object.keys(submissions).length;

      if (length < 5) {
        this.possibleSubs = new Array(length)
        for (let x in submissions) {
          let sub = new Submission(submissions[x])
          this.possibleSubs[i++] = sub;
        }
      }
      else {
        this.possibleSubs = new Array(5)
        for (let x in submissions) {
          if(i == 5){
            break;
          }
          let sub = new Submission(submissions[x]);
          this.possibleSubs[i++] = sub;
        }        
      }

      console.log(this.possibleSubs)
      // this.possibleSubs = new Array(5)
      // let count:number = 0;
      // for(i = 0; i < 5; i++) {
      //     let submission = new Submission(submissions[i])
      //       this.possibleSubs[i] = submission;
      //  }
      // console.log(this.possibleSubs)
    }).then(() => {
      setTimeout(this.checkAvailable.bind(this), this.ONE_MINUTE);
    })
  }

  findUser(user:string){}

  checkAvailable(){
    let i:number;
    for(i = 0; i < 5; i++){
      if(this.possibleSubs[i].numberOfCritiquesReceived >= 3){
        this.replaceSubmission(this.possibleSubs[i])
      }
    }
  }

  replaceSubmission(submission) {
    // console.log(submission)
    let ten: number = 10;
    this.timer = timer(this.TWENTY_FOUR_HOURS, 1000)
    this.timer = setTimeout(() => {
      // console.log(ten--)
      // if(ten < 0){
      //   ten = 10;
      // }
    }, 10)
    // console.log('done')
    // console.log(this.possibleSubs)

    this.subService.setUnavailable(submission).then((res) => {
      this.displayAvailable();
    })

  }



}


