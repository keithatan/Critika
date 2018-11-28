export class Account {
    username:string;
    email:string;

    constructor(response:any) {
        this.username = response.username
        this.email = response.email
    }
}