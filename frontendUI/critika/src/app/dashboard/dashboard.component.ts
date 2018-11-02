import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  renderComponent: String;

  constructor() { 
    this.renderComponent = "";
  }

  renderHome(){
    this.renderComponent = "home";
  }

  renderProfile(){
    this.renderComponent = "profile";
  }

  renderMySubmissions(){
    this.renderComponent = "my-submissions";
  }

  ngOnInit() {
  }



}
