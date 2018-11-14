import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Profile } from './profile.model'; 

@Injectable({
    providedIn: "root"
}) 

export class ProfileService {
    renderComponent: String = "";

    constructor(private http:HttpClient) {

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