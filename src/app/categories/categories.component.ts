import { CategoriesService } from './categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from './categories.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService]
})

export class CategoriesComponent implements OnInit {
  allCategories: Category[];
  categoriesForFilter: Category[];
  renderComponent: string = "";
  categoryNames: String[];

  constructor(private subService: CategoriesService) { 
    this.allCategories = subService.getAllCategories();
    console.log(subService)
    console.log(subService.allCategoriesInService)
  }

  getAllCategories() {
    // console.log(3)
    console.log(this.allCategories)
    // this.allCategories = this.subService.getAllCategories();
  }

  renderFileReport() {
    console.log(2)
    this.renderComponent = "file-report";
  }

  ngOnInit() {
    console.log(this.subService)
  }

  onSearchChange(searchValue: string) {
    let i: number;
    // for (i = 0; i < this.allCategories.length; i += 1) {
    //   console.log(this.allCategories[i])
    // }
    console.log(this.allCategories)
  }

}