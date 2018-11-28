import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html'
})
export class SignupComponent implements OnInit {

    @ViewChild('alert') alert: ElementRef;
    signUpForm: FormGroup;
    submitted = false;
    questions = ["What is your mother's maiden name?", 'What is your favorite drink?', 'What elementary school did you attend?']
    constructor(public authService: AuthService, private formBuilder: FormBuilder) { }


    ngOnInit() {
        this.signUpForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            email: ['', [Validators.required, Validators.email]],
            securityanswer: ['', Validators.required],
            securityquestion: ["What is your mother's maiden name?"]
        });
    }
    
    get form() { return this.signUpForm.controls }

    incomplete_form: string;

    async getIncompleteForm() {
        return await this.incomplete_form;
    }

    closeAlert(){
        this.alert.nativeElement.classList.remove('show');
    }

    onSignup(form: NgForm) {
        console.log(form)
        this.submitted = true;
        if (this.signUpForm.invalid) {
            return;
        }
        // Call to register the user, as well as get the response back from the server back end
        this.incomplete_form = this.authService.registerUser(form.value.email, form.value.username, form.value.password, form.value.securityanswer, form.value.securityquestion)
        console.log(this.incomplete_form)
    }

}