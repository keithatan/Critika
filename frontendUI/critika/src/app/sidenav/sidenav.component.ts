import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private authListenerSubs: Subscription;
  userAuthed = false;

  constructor(private authService:AuthService) { 

  }

  logout(){
    this.authService.logout();

  }
    

  ngOnInit() {
    this.userAuthed = this.authService.getIsAuth();

    this.authListenerSubs = this.authService.getAuthStatus().subscribe(isAuthenticated =>{
      this.userAuthed = isAuthenticated;
    })
  }

}
