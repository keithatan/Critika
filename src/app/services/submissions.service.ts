import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Subject, Observable, Subscriber } from "rxjs";
import { Submission } from '../models/submissions.model';

@Injectable({providedIn: "root"})
export class SubmissionService{

    renderComponent: String = "";
    mySubmissions:Submission[];
    myAvailable:Submission[];
    data: Object;

    constructor(private http:HttpClient){
        
    }

    addSubmission(submissionname: string, submissiontext: string, category:string, submissionlink:string,
        submissionskilllevel:string, submissiondescription: string
        ){
        const submission:Object = {submissionName: submissionname, submissionText : submissiontext, category :category, submissionSkillLevel: submissionskilllevel, submissionLink: submissionlink, submissionDescription: submissiondescription}
        
        this.http.post("http://localhost:5000/submission/add", submission)
        .subscribe(response => {
            console.log(response)
            
        },
        (err)=>{
            console.log(err);
        });


    }

    editSubmission(submissionname: string, submissiontext: string, submissioncategory: string){
        const submission:Object = {
            submissionName: submissionname, 
            submissionText : submissiontext, 
            submissionCategory: submissioncategory
        }
        var p = new Submission(submission)
        


        return this.http.post("http://localhost:5000/submission/edit", p)
        


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

    getAllReportedComments(){
        return this.http.get("http://localhost:5000/submission/all-reported").toPromise();
    }

    reportComment(submissionName:string, reportedMessage:string, comment:Object){
        const sub:Object = {
            submissionName: submissionName,
            reportedMessage: reportedMessage,
            comment: comment
        }
        return this.http.post("http://localhost:5000/submission/report-comment",sub).toPromise();

    }
    
}