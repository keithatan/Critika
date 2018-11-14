import { Component, OnInit } from '@angular/core';
import { SubmissionService } from 'src/app/services/submissions.service';
import { Submission } from '../../models/submissions.model';

@Component({
  selector: 'app-spend-coins',
  templateUrl: './spend-coins.component.html',
  styleUrls: ['./spend-coins.component.scss']
})
export class SpendCoinsComponent implements OnInit {
  mySubmissions:Submission[];
  Coins: string;
  myCoins: number;

  constructor(public subService:SubmissionService) {
    this.Coins = "1";
    this.myCoins = 5;
   }
  
  

  spendCoins(){
    this.mySubmissions = this.subService.spendCoins(localStorage.getItem('user'), this.Coins, );
    this.myCoins -=1;
  }

  ngOnInit() {
  }

}
