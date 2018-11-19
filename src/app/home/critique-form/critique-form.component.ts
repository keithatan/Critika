import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-critique-form',
  templateUrl: './critique-form.component.html',
  styleUrls: ['./critique-form.component.scss']
})
export class CritiqueFormComponent implements OnInit {

  constructor() { 
    this.renderComponent = "";
  }
  renderComponent: string;
  feedback: string;
  comment: string;

  ngOnInit() {
    
  }

}
