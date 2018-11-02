export class Submission{
    submissionName: string;
    submissionText: string;
    username: string;
    category:string;

    constructor(response:any){
        this.submissionName = response.submissionName;
        this.submissionText = response.submissionText;
        this.username = response.username;
        this.category = response.category;
    }
}