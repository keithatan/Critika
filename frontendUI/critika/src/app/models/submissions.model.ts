export class Submission{
    submissionName: string;
    submissionText: string;
    username: string;
    category:string;
    coins: number;
    recuser: string;
    available: boolean; 
    numberOfCritiquesReceived: number;
    submissionID: string;
    comments: Object[];
    skillLevel: string;

    constructor(response:any){
        this.submissionName = response.submissionName;
        this.submissionText = response.submissionText;
        this.username = response.username;
        this.category = response.category;
        this.coins = response.coins;
        this.recuser = response.recuser;
        this.available = response.available;
        this.numberOfCritiquesReceived = response.numberOfCritiquesRecieved;
        this.submissionID = response._id;
        this.comments = response.comments;
        this.skillLevel = response.skillLevel;
        
    }
}