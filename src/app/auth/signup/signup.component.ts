import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    selector:'app-signup',
    templateUrl: 'signup.component.html'
})
export class SignupComponent{
    constructor(public authService:AuthService){

    }

    incomplete_form:boolean;

    getIncompleteForm() {
        return this.incomplete_form;
    }

    onSignup(form: NgForm){
        console.log(form.value)
        this.incomplete_form = this.authService.registerUser(form.value.email, form.value.username, form.value.password, form.value.securityanswer, form.value.securityquestion)
    }
    
}