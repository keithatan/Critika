import { Component, OnInit } from '@angular/core';
import { renderComponent } from '@angular/core/src/render3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
    this.renderComponent = "";
  }
  renderComponent: String;

  renderCritiqueForm() {
    this.renderComponent = "critique-form";
  }

  Link: "Submission";

  ngOnInit() {
  }

}
