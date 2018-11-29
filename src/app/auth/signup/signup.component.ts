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
            confirmPassword: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            securityanswer: ['', Validators.required],
            securityquestion: ["What is your mother's maiden name?"]
        }, {validator: this.checkPasswords });
    }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }


    
    get form() { return this.signUpForm.controls }

    response: string = "NULL";

    get response_msg() { return this.response; }

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
        this.authService.registerUser(form.value.email, form.value.username, form.value.password, form.value.securityquestion, form.value.securityanswer).then((res)=> {
            console.log(res)
            this.response = "complete"
        }).catch((err) => {
            if (err.error.name == "MongoError") {
                this.response = "duplicate";
            }
            else {
                this.response = "fatalError";
            }
            console.log(err.error)
        })
        // this.response = AuthService.response_register_msg();
        // console.log(this.response)
    }

}