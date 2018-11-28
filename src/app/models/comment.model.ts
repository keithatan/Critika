export class Comment {
    username: string;
    message: string;
    reported: boolean;
    reportedMessage: string;
    reportedReason: string;

    constructor(response: any){
        this.username = response.username;
        this.message = response.message;
        this.reported = response.reported;
        this.reportedMessage = response.reportedMessage;
        this.reportedReason = response.reportedReason;
    }

}