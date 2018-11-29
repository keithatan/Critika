import { CategoriesService } from './categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from './categories.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService],
})

export class CategoriesComponent implements OnInit {
  categoriesForm: FormGroup;
  submissions: Object;
  categoriesForFilter: Object;
  renderComponent: string = "";
  categoryNames: String[];
  textAreasList: any = [];
  topThreeCategories: Object;

  constructor(public subService: CategoriesService, private formBuilder: FormBuilder) {
    this.categoryNames = [];
    this.submissions = [];
    this.categoriesForFilter = [];
    this.topThreeCategories = [];
  }

  renderFileReport() {
    this.renderComponent = "file-report";
  }

  ngOnInit() {
    this.categoriesForm = this.formBuilder.group({
      categoryName: [''],
      categoryDescription: [''],
    });
    this.updateCategories()
  }

  addTextarea() {
    this.textAreasList.push('text_area' + (this.textAreasList.length + 1));
  }

  updateCategories() {
    this.subService.getAllCategories().then((categories) => {
      //categories is an array of all categories
      this.categoriesForFilter = categories;
      let i: number;
      for (let x in categories) {
        var name = categories[x].categoryName
        this.categoryNames[i] = name
      }
      console.log(categories)
    }).then(()=>{
      this.getTopCategories()
    })
  }
  

  getSubmissionsInCategory(category) {
    // console.log(category)
    this.subService.getAllSubmissionsInCategory(category).then((subs) => {
      // console.log(subs)
      this.submissions = subs;
      console.log(subs)
    })
  }

  createCategory(form: NgForm) {

    console.log(form)

    this.subService.createCategory(form).then((cats) => {
      this.updateCategories()
    })
  }

  addComment(form: NgForm, submissionName){
    this.subService.addComment(form, submissionName).then((sub) => {
      this.subService.addCoin(localStorage.getItem('user'),1).then((sub) => {
        console.log(sub)
      })
    })
  }

  getTopCategories(){
    let max:number=0
    let count:number=0
    let first:object;
    let second:object;
    let third:object;
    //get most number of subscribers
    for(let obj in this.categoriesForFilter){
      if(this.categoriesForFilter[obj].numberOfSubmissions > max){
        max = this.categoriesForFilter[obj].numberOfSubmissions
        first = this.categoriesForFilter[obj];
      }
    }
    //get second most
    max=0;
    for(let obj in this.categoriesForFilter){
      if(this.categoriesForFilter[obj].numberOfSubmissions > max){
        if(this.categoriesForFilter[obj] == first){
          continue
        }
        else{
          second = this.categoriesForFilter[obj];
          max = this.categoriesForFilter[obj].numberOfSubmissions
        }
      }
    }
    //get third most
    max=0;
    for(let obj in this.categoriesForFilter){
      if(this.categoriesForFilter[obj].numberOfSubmissions > max){
        if(this.categoriesForFilter[obj] == first || this.categoriesForFilter[obj] == second){
          continue
        }
        else{
          third = this.categoriesForFilter[obj];
          max = this.categoriesForFilter[obj].numberOfSubmissions
        }
      }
    }
    this.topThreeCategories[0]=first
    this.topThreeCategories[1]=second
    this.topThreeCategories[2]=third
    console.log(this.topThreeCategories)
  }


}

