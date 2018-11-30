import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, Observable, of } from "rxjs";
import { Category } from './categories.model';
import { Submission } from "../models/submissions.model";
import { PARAMETERS } from "@angular/core/src/util/decorators";
import { NgForm } from '@angular/forms';

@Injectable({ providedIn: "root" })
export class CategoriesService {

    allCategoriesInService: Category[];
    data: Object;
    submissions: Submission[];

    constructor(private http: HttpClient) {

    }

    getAllCategoriesInService() {
        return this.allCategoriesInService
    }

    getAllCategories() {
        return this.http.get<Object>("https://critika-backend.herokuapp.com/category/get-all-category").toPromise();
    }

    getTopCategories() {
        return this.http.get<Object>("https://critika-backend.herokuapp.com/category/topCategories").toPromise();
    }

    
    getAllSubmissionsInCategory(category) {

        const requestOptions = {
            headers: new HttpHeaders({
                'category': category,
            })
        }
        // console.log(category)
        return this.http.get<Object>("https://critika-backend.herokuapp.com/category/all-subs-in-category", requestOptions).toPromise()
    }

    createCategory(form: NgForm) {

        const options = {
            "categoryName" : form.value.categoryName,
            "categoryDescription": form.value.categoryDescription
        }

        
        return this.http.post<Object>("https://critika-backend.herokuapp.com/category/create-category", options).toPromise();
    }

    addComment(form: NgForm, submissionID){
        const options = {
            "comment": form.value.comment,
            "submissionID": submissionID
        }
        console.log(submissionID)
        return this.http.post<Object>("https://critika-backend.herokuapp.com/submission/add-comment", options).toPromise();
    }

    addCoin(username, numCoins){
        const options = {
            "recuser": username,
            "coins": numCoins
        }
        return this.http.post<Object>("https://critika-backend.herokuapp.com/user/add-coin", options).toPromise();
    }

}