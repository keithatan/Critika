import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, Observable, of } from "rxjs";
import { Category } from './categories.model';
import { Submission } from "../models/submissions.model";
import { PARAMETERS } from "@angular/core/src/util/decorators";

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
        return this.http.get<Object>("http://localhost:5000/category/get-all-category").toPromise();
    }

    getAllSubmissionsInCategory(category) {

        const requestOptions = {
            headers: new HttpHeaders({
                'category': category,
            })
        }
        // console.log(category)
        return this.http.get<Object>("http://localhost:5000/category/all-subs-in-category", requestOptions).toPromise()
    }

    createCategory(categoryName, categoryDescription) {
        //add category with post request
        //pass username, categoryName, categoryDescription

        const options = {
            "categoryName" : categoryName,
            "categoryDescription": categoryDescription
        }
        
        return this.http.post<Object>("http://localhost:5000/category/create-category", options).toPromise();
    }

}