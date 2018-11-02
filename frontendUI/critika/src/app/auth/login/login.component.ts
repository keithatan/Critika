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

    login_failed:boolean;

    getLoginFailed() {
        return this.login_failed;
    }

    onLogin(form: NgForm){
        console.log(form.value)
        this.login_failed = this.authService.login(form.value.username, form.value.password)
    }

}