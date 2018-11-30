import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SubmissionService } from '../../services/submissions.service'
import { CategoriesService } from '../../categories/categories.service';
import { NgForm, FormGroup, FormBuilder, } from '@angular/forms';

@Component({
  selector: 'app-add-sub',
  templateUrl: './add-sub.component.html',
  styleUrls: ['./add-sub.component.scss']
})
export class AddSubComponent implements OnInit {

  @Output() returnToParent = new EventEmitter<string>();

  categoriesForm: FormGroup;
  addSubForm: FormGroup;
  submissions: Object;
  categoriesForFilter: Object;
  renderComponent: string = "";
  categoryNames: String[];
  textAreasList: any = [];
  topThreeCategories: Object;
  SubName: '';
  Link: string;
  Category: '';
  des: '';
  CatChosen: boolean;
  skill: string;
  C: 'yee';
  skills = ["Beginner", "Intermediate", "Expert"]

  constructor(public catService: CategoriesService, private formBuilder: FormBuilder, public subService: SubmissionService) {
    this.categoryNames = [];
    this.submissions = [];
    this.categoriesForFilter = [];
    this.topThreeCategories = [];
    this.CatChosen = false;
  }

  sendSubmission(form:NgForm) {
    console.log(form)
    console.log(form.value.Description)
    console.log(form.value.skill)
    this.subService.addSubmission(form.value.SubName, form.value.feedback, this.C, form.value.Link, form.value.skill,  form.value.Description)
    .subscribe ((response) => {
      console.log(response);
      console.log('Worked');
      this.returnToParent.emit('dash');
    },
    (err) =>{
      console.log(err)
    })
    
  }

  ngOnInit() {
    this.categoriesForm = this.formBuilder.group({
      categoryName: [''],
      categoryDescription: [''],
    });
    this.addSubForm = this.formBuilder.group({
      Link: [''],
      feedback: [''],
      skill: [''],
      Description: [''],
      SubName: ['']
    })
    this.updateCategories()
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

  updateTable() {
    
  }

  choseCat(c) {
    this.CatChosen = true;
    this.C = c;
  }

  get form() {
    return this.addSubForm.controls;
  }
}