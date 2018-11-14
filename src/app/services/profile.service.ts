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

    editProfile(username:string, membersince: Date, rating: Number, coins: Number, aboutme: string){
        const profile:Object = {
                username: username,
                memberSince: membersince,
                rating: rating,
                coins: coins,
                aboutMe: aboutme
        }

        var parameter = new Profile(profile)

        this.http.post("http://localhost:5000/profile/editProfile", parameter)
        .subscribe (response => {
            console.log(response);
        })
    }
}