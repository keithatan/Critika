export class Submission{
    submissionName: string;
    submissionText: string;

    constructor(response:any){
        this.submissionName = response.submissionName;
        this.submissionText = response.submissionText;
    }
}