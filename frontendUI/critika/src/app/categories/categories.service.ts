import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Community } from './categories.model';

@Injectable({providedIn: "root"})
export class CategoriesService{

    communities: Community[];
    data: Object;

    constructor(private http:HttpClient){
        
    }

    getAllCommunities(){
        this.http.get("http://localhost:5000/community/get-all-community")
            .subscribe((response:string) => {
                let i:number;
                console.log(response)
                this.communities = new Array(response.length)

                for(i = 0;i< response.length; i+=1) {
                    let c = new Community(response[i])
                    console.log(c)
                    this.communities[i] = c;
                 }
        
                console.log(this.communities)

            });    
        
            return this.communities
            
    }

}