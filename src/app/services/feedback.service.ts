import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Subject, Observable, Subscriber } from "rxjs";
import { Feedback } from '../models/feedback.model';
import { Http } from "@angular/http";

@Injectable({providedIn: 'root'})
export class FeedbackService {
    renderComponent: String = "";
    feedbackReceived: Feedback[];
    data: Object;
    constructor(private http:HttpClient){ }

    //rate feedback received
   rateFeedback (feedbackmessage: string, feedbacksubject: string, feedbackrating: Number, 
                username: string, anonymous: boolean){
       const feedback:Object = {feedbackMessage: feedbackmessage, feedbackSubject: feedbacksubject,
                                 feedbackRating: feedbackrating, username: username, anonymous: anonymous }

        var p = new Feedback(feedback);
        this.http.post("http://localhost:5000/feedback/rate", p)
        .subscribe(response => {
            console.log(response)
            
        });
   }
   
   giveFeedback(feedbackmessage: string, feedbacksubject: string,
    username: string, submissionName:string, anonymous:boolean){
        const feedbackO:Object = {feedbackMessage: feedbackmessage, feedbackSubject: feedbacksubject,username: username, submissionName: submissionName, anonymous: anonymous }

            var feedback = new Feedback(feedbackO);

            console.log(feedback)
            this.http.post("http://localhost:5000/feedback/critique", feedback).subscribe(response => {
                console.log(response);
            });

   }

   getFeedbacks():Promise<Feedback[]> {
       return this.http.get<Feedback[]>("http://localhost:5000/feedback/all-user").toPromise();
   }
}