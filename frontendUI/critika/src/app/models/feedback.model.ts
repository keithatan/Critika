export class Feedback {
    username: string;
    anonymous: boolean;
    feedbackMessage: string;
    feedbackSubject: string;
    feedbackRating: Number;

    constructor(response: any){
        this.username = response.username;
        this.anonymous = response.anonymous;
        this.feedbackMessage = response.feedbackMessage;
        this.feedbackSubject = response.feedbackSubject;
        this.feedbackRating = response.feedbackRating;
    }
}