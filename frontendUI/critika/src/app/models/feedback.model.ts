export class Feedback {
    username: string;
    anonymous: boolean;
    feedbackGood: string;
    feedbackBad: string;
    feedbackWork: string;
    submissionID: string;
    submissionName: string;
    feedbackRating: Number;

    constructor(response: any) {
        this.submissionID = response.submissionID;
        this.username = response.username;
        this.submissionName = response.submissionName;
        this.anonymous = response.anonymous;
        this.feedbackGood = response.feedbackGood;
        this.feedbackBad = response.feedbackBad;
        this.feedbackWork = response.feedbackWork;
        this.feedbackRating = response.feedbackRating;
    }
}
