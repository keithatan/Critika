import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders, HttpParams} from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Profile } from '../models/profile.model'; 
import { NgForm } from "@angular/forms";

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
        return this.http.get("http://secure-peak-43679.herokuapp.com/user/account").toPromise()
        
    }
    
    editProfile(homepage:string, loc: string, occupation: string, aboutme: string){
        const profile:Object = {
            location: loc,
            homepage: homepage,
            occupation: occupation,
            aboutme: aboutme
        }
        
        return this.http.post("http://secure-peak-43679.herokuapp.com/user/profile", profile)
    }
    
    getAllUsers(){
        return this.http.get("http://secure-peak-43679.herokuapp.com/user/all-users").toPromise();
    }

    getUser(user:string){
        const param:Object = {
            username: user
        }
        return this.http.post("http://secure-peak-43679.herokuapp.com/user/find", param);
    }
    banUser(user: string) {

        const param:Object = {
            usernameToBeBanned: user
        }
        return this.http.post("http://secure-peak-43679.herokuapp.com/user/ban-user", param);
    }

    restoreUser(user: string) {

        const param:Object = {
            usernameToBeRestored: user
        }
        return this.http.post("http://secure-peak-43679.herokuapp.com/user/restore-user", param);
    }

    AdminUser(user: string) {

        const param:Object = {
            username: user
        }
        return this.http.post("http://secure-peak-43679.herokuapp.com/user/become-admin", param);
    }
}