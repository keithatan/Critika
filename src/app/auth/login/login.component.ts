import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    selector:'app-login',
    templateUrl: 'login.component.html'

})
export class LoginComponent{
    constructor(public authService:AuthService){

    }


    onLogin(form: NgForm){
        console.log(form.value)
        this.authService.login(form.value.username, form.value.password)
    }

}