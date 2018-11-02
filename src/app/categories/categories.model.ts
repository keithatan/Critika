export class Community{
    communityName;
    communityDescription;
    founder;

    constructor(response:any){
        this.communityName = response.communityName;
        this.communityDescription = response.communityDescription;
        this.founder = response.founder;
    }

}