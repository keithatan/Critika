import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, Observable, of } from "rxjs";
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

    getAllCategoriesInService() {
        return this.allCategoriesInService
    }

    getAllCategories() {
        return this.http.get<Object>("http://localhost:5000/community/get-all-category").toPromise();
        /*
        this.http.get("http://localhost:5000/community/get-all-category")
            .subscribe((response: string) => {
                let i: number;
                this.allCategoriesInService = new Array(response.length)

                for (i = 0; i < response.length; i += 1) {
                    let c = new Category(response[i])
                    this.allCategoriesInService[i] = c;
                }

                console.log(this.allCategoriesInService)

            })
            const ret = this.allCategoriesInService
        return ret;
        */
    }

    getAllSubmissionsInCategory(category) {
        this.http.get("http://localhost:5000/community/all-subs-in-category", { headers: category })
            .subscribe((response: string) => {
                // console.log(response)
            })
    }

}