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

  constructor(public subService:FeedbackService) { }

  getFeedbacks(){}

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
