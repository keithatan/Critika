import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Profile } from '../models/profile.model'; 

@Injectable({
    providedIn: "root"
}) 

export class ProfileService {
    renderComponent: String = "";

    constructor(private http:HttpClient) {

    }

    getProfile(){
        //make API call, then call toPromise
        // calling the api and then letting X know that im done and heres the information
        return this.http.get("http://localhost:5000/user/account").toPromise()

    }

    editProfile(homepage:string, loc: string, occupation: string, aboutme: string){
        const profile:Object = {
                location: loc,
                homepage: homepage,
                occupation: occupation,
                aboutme: aboutme
        }

        return this.http.post("http://localhost:5000/user/profile", profile)
    }

    getAllUsers(){
        return this.http.get("http://localhost:5000/user/all-users").toPromise();
    }
}