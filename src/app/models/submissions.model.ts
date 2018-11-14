export class Submission{
    submissionName: string;
    submissionText: string;
    username: string;
    category:string;
    coins: number;
    recuser: string;


    constructor(response:any){
        this.submissionName = response.submissionName;
        this.submissionText = response.submissionText;
        this.username = response.username;
        this.category = response.category;
        this.coins = response.coins;
        this.recuser = response.recuser;
    }
}