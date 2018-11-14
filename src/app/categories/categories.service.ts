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
        return this.http.get<Object>("http://localhost:5000/community/get-all-category").toPromise();
    }

    getAllSubmissionsInCategory(category) {
        this.http.get("http://localhost:5000/community/all-subs-in-category", { headers: category })
            .subscribe((response: string) => {
                // console.log(response)
            })
    }

}