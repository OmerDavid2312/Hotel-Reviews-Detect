import {  ReviewStats } from './../../../../models/Hotel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews-box',
  templateUrl: './reviews-box.component.html',
  styleUrls: ['./reviews-box.component.css']
})
export class ReviewsBoxComponent implements OnInit {
  
  @Input() reviewStats:ReviewStats;

  constructor() { }

  ngOnInit(): void {
    console.log(this.reviewStats);

  }

  public generateStars(count: number): Array<number> {
    let indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }

}
