import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private authListenerSubs: Subscription;
    userAuthed = false;

    ngOnInit(){
      this.authListenerSubs = this.authService.getAuthStatus().subscribe(isAuthenticated =>{
        this.userAuthed = isAuthenticated;
      })
    }


    constructor(private authService: AuthService){
      
    } 
}
