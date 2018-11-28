export class Profile  {
    username: string;
    memberSince: string;
    rating: Number;
    coins: Number;
    submissionNum: Number;
    aboutMe: string;
    standing: string;
    occupation: string;
    location: string;
    homepage: string;

    constructor(response:any) {
        this.username = response.username;
        this.occupation = response.occupation;
        this.location = response.location;
        this.homepage = response.homepage
        this.memberSince = response.memberSince;
        this.rating = response.rating.$numberDecimal;
        this.coins = response.coins;
        this.submissionNum = response.submissionNum;
        this.aboutMe = response.aboutMe;
        this.standing = response.standing;
    }
}