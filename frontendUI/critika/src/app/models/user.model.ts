export class User {
    username: string;
    ratingNum: number;
    submissionNum: number;
    userRating: number;
    rating: number;
    critiqueNum: number;


    constructor(response: any) {
        this.username = response.username;
        this.ratingNum = response.ratingNum;
        this.rating = response.rating;
        this.submissionNum = response.submissionNum;
        this.critiqueNum = response.critiqueNum;

        if (response.ratingNum == 0) {
            this.userRating = 0
        }
        else {
            this.userRating = response.rating / (response.ratingNum-1);
        }

    }

}