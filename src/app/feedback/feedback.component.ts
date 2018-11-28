import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../models/feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackReceived: Feedback[];
  renderComponent: String = "";
  toRate: boolean;

  constructor(public subService:FeedbackService) { 
    this.toRate = false;
  }

  getFeedbacks(){}

  renderRateFeedback() {
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
     }
    
   }
  

  ngOnInit() {
    this.subService.getFeedbacks().then((data) => {
      let i: number;

      let response = [];
      response.push(data)

      this.feedbackReceived = new Array(response[0].length)

      for (i = 0; i < response[0]. length; i++) {
        let feedback = new Feedback(response[0][i])
        this.feedbackReceived[i] = feedback;
      }

    });

  }

}
