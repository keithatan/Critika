import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoriesService } from "./categories.service";

@Injectable()
export class CategoriesInterceptor implements HttpInterceptor{
    constructor(private categoriesService: CategoriesService){

    }
    intercept(req:HttpRequest<any>, next:HttpHandler){
        const authToken = localStorage.getItem('token')
        //this.authService.getToken();
        // console.log("Intercept")
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