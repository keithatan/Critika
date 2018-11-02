import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders} from "@angular/common/http";
import {AuthData} from './auth-data.model'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };

@Injectable({providedIn: "root"})
export class AuthService{

    private token:string
    constructor(private http:HttpClient){

    }

    getToken() {
        return this.token;
    }

    registerUser(email: string, username: string, password: string, securityquestion: string, securityanswer: string) {
        const auth: AuthData = {email: email, username: username, password: password, securityquestionanswer: securityanswer, securityquestion: securityquestion}
        this.http.post("http://localhost:5000/user/register", auth)
            .subscribe(response => {
                console.log(response)
            });
    }

    login(username:string, password:string){

        const auth: AuthData = {username: username, password: password, securityquestionanswer: "", securityquestion: "", email: ""}
        this.http.post("http://localhost:5000/user/login", auth, httpOptions)
            .subscribe(response => {
                console.log(response)
                const token = response.headers.get('token');
                this.token = token
                console.log(this.token)
            });

    }

}