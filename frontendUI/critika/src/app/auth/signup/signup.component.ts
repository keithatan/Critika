import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    selector:'app-signup',
    templateUrl: 'signup.component.html'
})
export class SignupComponent implements OnInit{

    signUpForm: FormGroup;
    submitted = false;
    questions = ["What is your mother's maiden name?", 'What is your favorite drink?', 'What elementary school did you attend?']
    constructor(public authService:AuthService, private formBuilder:FormBuilder){}


    ngOnInit() {
        this.signUpForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            email: ['', [Validators.required, Validators.email]],
            securityanswer: ['', Validators.required],
            securityquestion: ["What is your mother's maiden name?"]
        });
    }

    get form() {return this.signUpForm.controls}

    incomplete_form:string;

    getIncompleteForm() {
        return this.incomplete_form;
    }

    onSignup(form: NgForm) {
        console.log(form)
        this.submitted = true;
        if (this.signUpForm.invalid) {
            return;
        }
        this.incomplete_form = this.authService.registerUser(form.value.email, form.value.username, form.value.password, form.value.securityanswer, form.value.securityquestion)
    }
    
}