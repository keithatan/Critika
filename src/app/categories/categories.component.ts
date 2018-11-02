import { CategoriesService } from './categories.service';
import { Component, OnInit } from '@angular/core';
import { Community } from './categories.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    communities:Community[];
    renderComponent: string = "";
  constructor(public subService:CategoriesService) { }
  getAllCommunitiesPls(){
    this.communities = this.subService.getAllCommunities();
  }
  renderFileReport() {
        this.renderComponent = "file-report";
    }

  ngOnInit() {
  }

}