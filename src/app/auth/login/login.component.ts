import { Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'

})
export class LoginComponent implements OnInit {

    @ViewChild('alert') alert: ElementRef;

    loginForm: FormGroup;
    constructor(private router:Router, public authService: AuthService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get form() { return this.loginForm.controls }

    response: string;
    submitted = false;

    get response_msg() { return this.response; }

    closeAlert() {
        this.alert.nativeElement.classList.remove('show');
        this.router.navigate(['verify']);
    }

    onLogin(form: NgForm) {
        console.log("Login Info: " + form.value)
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.response = this.authService.login(form.value.username, form.value.password)
    }

}