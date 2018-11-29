import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Submission } from '../../models/submissions.model';
import { SubmissionService } from '../../services/submissions.service';
import { CategoriesService } from '../../categories/categories.service';
import { NgForm, FormGroup, FormBuilder, } from '@angular/forms';


@Component({
  selector: 'app-edit-sub',
  templateUrl: './edit-sub.component.html',
  styleUrls: ['./edit-sub.component.scss']
})
export class EditSubComponent implements OnInit {
  @Input('childSubmission') childSubmission: Submission;
  @Output() returnToParent = new EventEmitter<string>();
  boop: 'lmao';
  view:boolean;
  constructor(public catService: CategoriesService, private formBuilder: FormBuilder, private subService:SubmissionService) { 
    this.view = false;
    this.categoryNames = [];
    this.submissions = [];
    this.categoriesForFilter = [];
    this.topThreeCategories = [];
    this.CatChosen = false;
  }

  
  subName: '';
  text: '';
  category: '';
  renderComponent: String;

  categoriesForm: FormGroup;
  submissions: Object;
  categoriesForFilter: Object;
  categoryNames: String[];
  textAreasList: any = [];
  topThreeCategories: Object;
  CatChosen: boolean;
  C: 'yee';

  renderSubmission() {
    if (this.view == false){
       this.view = true;
    }
    else if (this.view == true) {
      this.view = false;
    }
    this.renderComponent = "Submission";
  }

  sendEdits(){
    this.subService.editSubmission(this.subName, this.text, this.category)
    .subscribe ((response) => {
      console.log(response);
      this.returnToParent.emit('reload')
    },
    (err) =>{
      console.log(err)
      // put a errror notify
    })
  }
  
  updateCategories() {
    this.catService.getAllCategories().then((categories) => {
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

  choseCat(c) {
    this.CatChosen = true;
    this.C = c;
  }

  ngOnInit() {
    this.categoriesForm = this.formBuilder.group({
      categoryName: [''],
      categoryDescription: [''],
    });
    this.updateCategories()
  }

}
