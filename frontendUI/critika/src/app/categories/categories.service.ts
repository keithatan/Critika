import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Category } from './categories.model';
import { Submission } from "../my-submissions/my-submissions.model";
import { PARAMETERS } from "@angular/core/src/util/decorators";

@Injectable({providedIn: "root"})
export class CategoriesService{

    allCategories: Category[];
    data: Object;
    submissions: Submission[];

    constructor(private http:HttpClient){
        
    }

    getAllCategories(){
        this.http.get("http://localhost:5000/community/get-all-community")
            .subscribe((response:string) => {
                let i:number;
                console.log(response)
                this.allCategories = new Array(response.length)

                for(i = 0;i< response.length; i+=1) {
                    let c = new Category(response[i])
                    console.log(c)
                    this.allCategories[i] = c;
                 }
        
                console.log(this.allCategories)

            });    
            return this.allCategories    
    }

    getAllSubmissionsInCommunity(community) {
        this.http.get("http://localhost:5000/community/all-subs-in-community", {headers: community})
            .subscribe((response:string) => {
                console.log(response)
            })
    }

}