import { Component, OnInit } from '@angular/core';
import { renderComponent } from '@angular/core/src/render3';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { 
    this.renderComponent = "";
  }

  renderComponent: String;

  renderAddSub() {
    this.renderComponent = "AddSub"
  }

  ngOnInit() {
  }

}
