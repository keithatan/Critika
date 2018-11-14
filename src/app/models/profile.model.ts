export class Profile  {
    username: string;
    memberSince: Date;
    rating: Number;
    coins: Number;
    aboutMe: string;

    constructor(response:any) {
        this.username = response.username;
        this.memberSince = response.memberSince;
        this.rating = response.memberSince;
        this.coins = response.coins;
        this.aboutMe = response.aboutMe;
    }
}