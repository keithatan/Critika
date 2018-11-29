import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input('chosenUser') chosenUser:string;
  displayUser:Object

  constructor(private proService:ProfileService) { }

  ngOnInit() {
    this.proService.getUser(this.chosenUser).subscribe((res) =>{
      this.displayUser = new Object(res);
      console.log(this.displayUser);
    })
  }

}
