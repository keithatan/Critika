export class Profile  {
    username: string;
    memberSince: Date;
    rating: Number;
    coins: Number;
    submissionNum: Number;
    aboutMe: string;
    standing: string;

    constructor(response:any) {
        this.username = response.username;
        this.memberSince = response.memberSince;
        this.rating = response.memberSince;
        this.coins = response.coins;
        this.submissionNum = response.submissionNum;
        this.aboutMe = response.aboutMe;
        this.standing = response.standing;
    }
}