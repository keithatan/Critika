import { Component, OnInit } from '@angular/core';
import {SubmissionService} from '../services/submissions.service'
import {Submission} from '../models/submissions.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  possibleSubs:Submission[];

  constructor(public subService:SubmissionService) {
    this.renderComponent = "";
  }
  renderComponent: String;

  renderCritiqueForm() {
    this.renderComponent = "critique-form";
  }

  Link: "Submission";

  ngOnInit() {
    this.subService.getAvailable().then((submissions)=>{

      let i:number;

      this.possibleSubs = new Array(5)

      for(i = 0;i< 5; i+=1) {
          let submission = new Submission(submissions[i])
          this.possibleSubs[i] = submission;
       }
      //console.log(this.possibleSubs)
    }).then(() => {
      setInterval(this.checkAvailable.bind(this), 1000);
    })
  }

  checkAvailable(){
    let i:number;
    for(i = 0; i < 5; i++){
      // console.log(this.possibleSubs[i])
      if(this.possibleSubs[i].available == false){
        setTimeout(this.replaceSubmission.bind(this), 1000)
      }
    }
  }

  replaceSubmission(){
    console.log()
  }

  

}


