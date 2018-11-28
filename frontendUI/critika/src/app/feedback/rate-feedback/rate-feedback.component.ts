import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-feedback',
  templateUrl: './rate-feedback.component.html',
  styleUrls: ['./rate-feedback.component.scss']
})
export class RateFeedbackComponent implements OnInit {

  showAllFeedbacks: boolean;
  renderComponent:String = "";

  constructor() { 
    this.showAllFeedbacks = false;
  }

  renderViewFeedback() {
    //if showAllFeedbacks is false, then rateFeedback page is shown
     if (this.showAllFeedbacks == false) { 
       this.showAllFeedbacks = true;
     }

     else if (this.showAllFeedbacks == true) {
       this.showAllFeedbacks = false;
     }

     this.renderComponent = "feedback";
   }
  
  
  ngOnInit() {
  }

}
