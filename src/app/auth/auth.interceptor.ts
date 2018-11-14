import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){

    }
    intercept(req:HttpRequest<any>, next:HttpHandler){
        const authToken = localStorage.getItem('token')
        //this.authService.getToken();
        console.log("Intercept")
        if (authToken){
        const authRequest = req.clone({

            headers: req.headers.set('token', authToken)
        

        });
        // console.log("1")
        return next.handle(authRequest)

        }else{
            const authRequest = req.clone();
            // console.log("2")

            return next.handle(authRequest)

        }
        
        
    }
}