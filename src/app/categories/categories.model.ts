export class Category {
    categoryName;
    categoryDescription;
    founder;

    constructor(response: any) {
        this.categoryName = response.categoryName;
        this.categoryDescription = response.categoryDescription;
        this.founder = response.founder;
    }
}