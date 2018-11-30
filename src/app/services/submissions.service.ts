import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Subject, Observable, Subscriber } from "rxjs";
import { Submission } from '../models/submissions.model';
import { NgForm } from "@angular/forms";

@Injectable({providedIn: "root"})
export class SubmissionService{

    renderComponent: String = "";
    mySubmissions:Submission[];
    myAvailable:Submission[];
    data: Object;
    comment: string;

    constructor(private http:HttpClient){
        
    }

    addSubmission(submissionname: string, submissiontext: string, category:string, submissionlink:string,
        submissionskilllevel:string, submissiondescription: string
        ){
        const submission:Object = {submissionName: submissionname, submissionText : submissiontext, category :category, submissionSkillLevel: submissionskilllevel, submissionLink: submissionlink, submissionDescription: submissiondescription}
        
        return this.http.post("http://localhost:5000/submission/add", submission)
        


    }

    editSubmission(submissionLink: string, submissionDescription: string, submissionDesiredFeedback: string, submissionID: string){
        const submission:Object = {
            submissionLink: submissionLink, 
            submissionText : submissionDesiredFeedback, 
            submissionDescription: submissionDescription,
            submissionID: submissionID
        }        


        return this.http.post("http://localhost:5000/submission/edit", submission)
        


    }

    //get submission user can critique
    getAvailable(){
        return this.http.get("http://localhost:5000/submission/available-with-categories").toPromise();
    }

    //get user's submissions
    getSubmissions():Promise<Submission[]>{
        return this.http.get<Submission[]>("http://localhost:5000/submission/mine").toPromise()
    }

    spendCoins(username1: string, coins1: string){
        const submission:Object = {recuser : username1, coins: coins1}
        var p = new Submission(submission)
        console.log (p)
        this.http.post("http://localhost:5000/user/remove-coin", p)
        .subscribe((response) => {
            console.log(response)
        }).unsubscribe();

        return this.mySubmissions
    }

    
    setUnavailable(submission){
        //TODO: remove submission when route gets made available
        const sub:Object = {
            submissionID: submission.submissionID,
        }
        var p = new Submission(sub);
        console.log(sub)
        return this.http.post("http://localhost:5000/submission/make-unavailable", sub).toPromise();
    }

    addComment(comment, submissionID){
        const options = {
            "comment": comment,
            "submissionID": submissionID
        }
        console.log(submissionID)
        return this.http.post<Object>("http://localhost:5000/submission/add-comment", options).toPromise();
    }


    getAllReportedComments(){
        return this.http.get("http://localhost:5000/submission/all-reported").toPromise();
    }

    getLeaderboard() {
        return this.http.get("http://localhost:5000/user/leaderboard").toPromise();
    }

    getLeaderboardReverse() {
        return this.http.get("http://localhost:5000/user/leaderboard-reverse").toPromise();
    }

    reportComment(commentID:string, submissionID:string, reportedMessage:string){
        const sub:Object = {
            submissionID: submissionID,
            reportedMessage: reportedMessage,
            commentID: commentID
        }
        return this.http.post("http://localhost:5000/submission/report-comment",sub).toPromise();

    }
    
}