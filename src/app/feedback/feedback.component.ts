import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../models/feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  tableElements = ['Submission Title', 'User', 'What went well', 'What went wrong', 'What could be improved', 'Rate a Feedback'];
  myFeedbacks: Feedback[];
  renderComponent: String = "";
  chosen: Feedback;
  toRate: boolean;
  isEmpty: boolean = true;
  // public Id: Number;
  // public rateNum: Number;

  constructor(public subService:FeedbackService) { 
    this.toRate = false;
  }

  getFeedbacks(){}

  renderRateFeedback(f:Feedback) {
    //if showAllFeedbacks is false, then rateFeedback page is shown
     if (this.toRate == false) { 
       this.toRate = true;
     }

     if (this.toRate == true) {
       this.toRate = false;
     }

     if ( this.renderComponent == "rate-feedback") {
       this.renderComponent = "";
     }
     else {
       this.renderComponent = "rate-feedback";
       this.chosen = f;
     }
    
   }
  

  ngOnInit() {
    this.getFeeback();
  }

  getChildEvent(str:string){
    this.subService.getFeedbacks().then((data) => {
      let i: number;

      let response = [];
     // console.log(data)
      response.push(data)

      this.myFeedbacks = new Array(response[0].length)

      for (i = 0; i < response[0].length; i++) {
        let feedback = new Feedback(response[0][i])
        this.myFeedbacks[i] = feedback;
        // console.log(feedback);
      }
      console.log(this.myFeedbacks);
    });

  }

  getFeeback(){
    this.subService.getFeedbacks().then((data) => {
      let i: number;

      let response = [];
     // console.log(data)
      response.push(data)

      this.myFeedbacks = new Array(response[0].length)

      if (response[0].length > 0) {
        this.isEmpty == false;
      }
      else {
        this.isEmpty == true;
      }

      for (i = 0; i < response[0].length; i++) {
        let feedback = new Feedback(response[0][i])
        this.myFeedbacks[i] = feedback;
        // console.log(feedback);
      }
    
      console.log(this.myFeedbacks);
    });
  }
}
