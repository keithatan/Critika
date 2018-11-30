import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Feedback } from '../../models/feedback.model';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-rate-feedback',
  templateUrl: './rate-feedback.component.html',
  styleUrls: ['./rate-feedback.component.scss']
})
export class RateFeedbackComponent implements OnInit {
   @Input('childFeedback') childFeedback: Feedback;
   @Output() returnToParent = new EventEmitter<string>();

  ratings = [ 1, 2, 3, 4, 5 ];
  showAllFeedbacks: boolean;
  renderComponent:String = "";
  feedbackRating: Number = 0;
  // submissionId = this.childFeedback.submissionID;

  constructor(private rService:FeedbackService) { 
    this.showAllFeedbacks = false;
  }

  submitRate() {
    console.log(this.childFeedback)
    this.rService.rateFeedback(this.feedbackRating, this.childFeedback.submissionID, this.childFeedback.feedbackID)
    .subscribe ((response) => {
      console.log(response);
      this.returnToParent.emit('reload')
      
  },
  (err) =>{
    console.log(err)
    // put a errror notify
  })

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
     this.returnToParent.emit('close')

   }
  
  
  ngOnInit() {
    
  }

}
