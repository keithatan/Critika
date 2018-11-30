import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthData } from './auth-data.model'
import { Subject } from "rxjs";
import { ThrowStmt } from "@angular/compiler";
import { resolve } from "url";
import { Router } from "@angular/router";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
};

@Injectable({ providedIn: "root" })

export class AuthService {


    private tokenTimer: any;
    private token: string
    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();
    response_login: string = "NULL";

    constructor(private http: HttpClient, private router: Router) { }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false)
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/login']);
    }

    getAuthStatus() { return this.authStatusListener.asObservable(); }

    registerUser(email: string, username: string, password: string, securityquestion: string, securityanswer: string) {
        const auth: AuthData = { email: email, username: username, password: password, securityquestionanswer: securityanswer, securityquestion: securityquestion }
        return this.http.post<Object>("https://critika-backend.herokuapp.com/user/register", auth).toPromise()
    }

    login(username: string, password: string) {
        const auth: AuthData = { username: username, password: password, securityquestionanswer: "", securityquestion: "", email: "" }
        this.http.post("https://critika-backend.herokuapp.com/user/login", auth, httpOptions)
            .subscribe(response => {
                const token = response.headers.get('token');
                this.token = token
                if (token) {
                    const expiresInDuration = 7200;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    this.response_login = "complete";
                    console.log(expirationDate);
                    this.saveAuthData(token, expirationDate);
                    this.router.navigate(["/home"]);
                }
            },
                error => {
                    if (error.error.message == "Account has not been verified, please verify your account") {
                        this.response_login = "verify"
                    }
                    else {
                        this.response_login = "failed";
                    }
                    console.log(error);
                }
            );
        return this.response_login
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }


    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem('user', name)
        localStorage.setItem("expiration", expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("user")
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }

}