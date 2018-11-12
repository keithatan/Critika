import { CategoriesService } from './categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from './categories.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    allCategories:Category[];
    renderComponent: string = "";
  constructor(public subService:CategoriesService) { }
  getAllCommunitiesPls(){
    this.allCategories = this.subService.getAllCategories();
  }
  renderFileReport() {
        this.renderComponent = "file-report";
  }

  ngOnInit() {
  }

}