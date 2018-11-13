export class Category {
    categoryName;
    categoryDescription;
    founder;

    constructor(response: any) {
        this.categoryName = response.communityName;
        this.categoryDescription = response.communityDescription;
        this.founder = response.founder;
    }
}