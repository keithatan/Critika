import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Submission } from './my-submissions.model';

@Injectable({providedIn: "root"})
export class SubmissionService{

    mySubmissions:Submission[];
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

    getSubmissions(){
        this.http.get("http://localhost:5000/submission/mine")
            .subscribe((response:string) => {

                let i:number;

                this.mySubmissions = new Array(response.length)

                for(i = 0;i< response.length; i+=1) {
                    let submission = new Submission(response[i])
                    this.mySubmissions[i] = submission;
                 }
        
                console.log(this.mySubmissions)

            });    
        
            return this.mySubmissions
            
    }

}