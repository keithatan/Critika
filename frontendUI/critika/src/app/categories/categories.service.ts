import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Category } from './categories.model';
import { Submission } from "../my-submissions/my-submissions.model";
import { PARAMETERS } from "@angular/core/src/util/decorators";

@Injectable({ providedIn: "root" })
export class CategoriesService {

    allCategoriesInService: Category[];
    data: Object;
    submissions: Submission[];

    constructor(private http: HttpClient) {

    }

    getAllCategories() {
        this.http.get("http://localhost:5000/community/get-all-category")
            .subscribe((response: string) => {
                let i: number;
                //console.log(response)
                this.allCategoriesInService = new Array(response.length)

                for (i = 0; i < response.length; i += 1) {
                    let c = new Category(response[i])
                    // console.log(c)
                    this.allCategoriesInService[i] = c;
                }

                console.log(this.allCategoriesInService)

            })
        return this.allCategoriesInService


    }

    getAllSubmissionsInCategory(category) {
        this.http.get("http://localhost:5000/community/all-subs-in-category", { headers: category })
            .subscribe((response: string) => {
                // console.log(response)
            })
    }

}