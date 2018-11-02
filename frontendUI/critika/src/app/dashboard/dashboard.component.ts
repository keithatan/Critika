import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  renderComponent: String = "";


  constructor(){}


  renderHome(){
    this.renderComponent = "home";
  }
  ngOnDestroy() {
}

  renderProfile(){
    this.renderComponent = "profile";


  renderMySubmissions(){
    this.renderComponent = "my-submissions";

  }

  ngOnInit() {
  }



}
