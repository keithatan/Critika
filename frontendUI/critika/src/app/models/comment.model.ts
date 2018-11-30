export class Comment {
    username: string;
    message: string;
    reported: boolean;
    reportedMessage: string;
    reportedReason: string;

    constructor(){
        this.username = '';
        this.message = '';
        this.reported = true;
        this.reportedMessage = '';
        this.reportedReason = '';
    }

}