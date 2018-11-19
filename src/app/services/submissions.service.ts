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

    addSubmission(submissionname: string, submissiontext: string, category:string, username:string){
        const submission:Object = {submissionName: submissionname, submissionText : submissiontext, category :category, username : username}
        var p = new Submission(submission)
        
        this.http.post("http://localhost:5000/submission/add", p)
        .subscribe(response => {
            console.log(response)
            
        });


    }

    editSubmission(submissionname: string, submissiontext: string){
        const submission:Object = {submissionName: submissionname, submissionText : submissiontext}
        var p = new Submission(submission)
        
        this.http.post("http://localhost:5000/submission/edit", p)
        .subscribe(response => {
            console.log(response)
            
        });


    }

    getAvailable(){
        return this.http.get("http://localhost:5000/submission/all").toPromise();
    }

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
        console.log(submission)
        //TODO: remove submission when route gets made available
        const sub:Object = {
            submissionID: submission.submissionID,
        }
        var p = new Submission(sub);
        this.http.post("http://localhost:5000/submission/make-unavailable", sub).subscribe((res) => {
            // console.log(res)
        });
    }

}