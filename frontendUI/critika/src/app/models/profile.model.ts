export class Profile  {
    username: string;
    memberSince: string;
    rating: number;
    coins: number;
    ratingNum: number;
    submissionNum: number;
    aboutMe: string;
    standing: string;
    occupation: string;
    location: string;
    homepage: string;
    critiqueNum: number;

    constructor(response:any) {
        this.ratingNum = response.ratingNum;
        this.critiqueNum = response.critiqueNum;
        this.username = response.username;
        this.occupation = response.occupation;
        this.location = response.location;
        this.homepage = response.homepage
        this.memberSince = response.memberSince;
        this.rating = response.rating;
        this.coins = response.coins;
        this.submissionNum = response.submissionNum;
        this.aboutMe = response.aboutMe;
        this.standing = response.standing;
    }
}