export class Feedback {
    username: string;
    anonymous: boolean;
    feedbackMessage: string;
    feedbackSubject: string;
    submissionID: string;
    submissionName: string;
    feedbackRating: Number;

    constructor(response: any){
        this.submissionID = response.submissionID;
        this.username = response.username;
        this.submissionName = response.submissionName;
        this.anonymous = response.anonymous;
        this.feedbackMessage = response.feedbackMessage;
        this.feedbackSubject = response.feedbackSubject;
        this.feedbackRating = response.feedbackRating;
    }
}