export class Feedback {
    username: string;
    anonymous: boolean;
    feedbackMessage: string;
    feedbackSubject: string;
    submissionID: string;
    feedbackRating: Number;

    constructor(response: any){
        this.submissionID = response.submissionID;
        this.username = response.username;
        this.anonymous = response.anonymous;
        this.feedbackMessage = response.feedbackMessage;
        this.feedbackSubject = response.feedbackSubject;
        this.feedbackRating = response.feedbackRating;
    }
}