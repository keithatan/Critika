export class Submission{
    
    username: string;
    category:string;
    coins: number;
    recuser: string;
    available: boolean; 
    numberOfCritiquesReceived: number;
    submissionID: string;
    comments: Object[];
    submissionSkillLevel: string;
    submissionDescription: string;
    submissionLink: string;
    submissionName: string;
    submissionText: string;
    constructor(response:any){
        this.submissionDescription = response.submissionDescription;
        this.submissionLink = response.submissionLink;
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
        this.submissionSkillLevel = response.submissionSkillLevel;
        
    }
}