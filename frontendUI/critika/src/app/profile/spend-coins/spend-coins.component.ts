import { Component, OnInit } from '@angular/core';
import { SubmissionService } from 'src/app/my-submissions/my-submissions.service';
import { Submission } from '../../my-submissions/my-submissions.model';

@Component({
  selector: 'app-spend-coins',
  templateUrl: './spend-coins.component.html',
  styleUrls: ['./spend-coins.component.scss']
})
export class SpendCoinsComponent implements OnInit {
  mySubmissions:Submission[];
  Coins: string;

  constructor(public subService:SubmissionService) {
    this.Coins = "1";
   }
  
  

  spendCoins(){
    this.mySubmissions = this.subService.spendCoins(localStorage.getItem('user'), this.Coins, );
  }

  ngOnInit() {
  }

}
