import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders} from "@angular/common/http";
import {AuthData} from './auth-data.model'
import { Subject } from "rxjs";
import { ThrowStmt } from "@angular/compiler";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };

@Injectable({providedIn: "root"})
export class AuthService{

    private token:string
    private authStatusListener = new Subject<boolean>();
    failed:boolean = false;
    incomplete:string;

    constructor(private http:HttpClient){

    }

    getToken() {
        return this.token;
    }

    getAuthStatus(){
        return this.authStatusListener.asObservable();
    }

    registerUser(email: string, username: string, password: string, securityquestion: string, securityanswer: string) {
        const auth: AuthData = {email: email, username: username, password: password, securityquestionanswer: securityanswer, securityquestion: securityquestion}
        this.http.post("http://localhost:5000/user/register", auth)
            .subscribe(response => {
                console.log(response)
                this.incomplete = "complete";
            },
            error => {
              console.log(error.error)
              if (error.error.message == "User data is incomplete") {
                this.incomplete = "incomplete";  
              }
              else if (error.error.name == "MongoError") {
                this.incomplete = "duplicate"
              }
              else {
                  this.incomplete = "failed"
              }
              console.log(this.incomplete)
            });
            return this.incomplete;
    }

    login(username:string, password:string){

        const auth: AuthData = {username: username, password: password, securityquestionanswer: "", securityquestion: "", email: ""}
        this.http.post("http://localhost:5000/user/login", auth, httpOptions)
            .subscribe(response => {
                console.log(response)
                const token = response.headers.get('token');
                this.token = token
                console.log(this.token)
                this.authStatusListener.next(true)
                this.saveAuthData(token, username);
                this.failed = false;
            },
            error => {
                this.failed = true;
            }
            );
            return this.failed
    }

    autoAuthUser(){
        const authInformation = this.getAuthData();
        
    }

    private saveAuthData(token: string, name:string){
        localStorage.setItem('user', name)
        localStorage.setItem('token', token)
    }

    private clearAuthData(){
        localStorage.clearItem('token')
    }

    private getAuthData(){
        const token = localStorage.getItem('token')
        if (!token){
            return;
        }
        return {
            token: token
        
        };
    }

}