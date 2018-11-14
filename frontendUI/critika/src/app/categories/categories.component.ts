import { CategoriesService } from './categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from './categories.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService]
})

export class CategoriesComponent implements OnInit {
  allCategories: Category[];
  categoriesForFilter: Object;
  renderComponent: string = "";
  categoryNames: String[];

  constructor(public subService:CategoriesService) { 
    this.categoryNames = [];
    this.allCategories = [];
    this.categoriesForFilter = [];
  }

  getAllCategories() {
    return(this.allCategories)
  }

  renderFileReport() {
    this.renderComponent = "file-report";
  }

  ngOnInit() {
    
  }

  onSearchChange(searchValue: string) {
    let i: number;
    this.subService.getAllCategories().then((categories) => {
      //categories is an array of all categories
      this.categoriesForFilter = categories;
      let i:number;
      for(let x in categories){
        // console.log(categories[x].communityName)
        var name = categories[x].communityName
        this.categoryNames[i] = name

      }
    })
  }

}