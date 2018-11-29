import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    selector:'app-login',
    templateUrl: 'login.component.html'

})
export class LoginComponent implements OnInit{

    loginForm: FormGroup;
    constructor(public authService:AuthService, private formBuilder: FormBuilder){ }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get form() { return this.loginForm.controls }

    login_failed:boolean;
    submitted = false;

    getLoginFailed() {
        return this.login_failed;
    }

    onLogin(form: NgForm){
        console.log("Login Info: " + form.value)
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        console.log("attempted")
        this.login_failed = this.authService.login(form.value.username, form.value.password)
    }

}