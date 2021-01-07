import { ReviewsService } from './../../../../services/reviews.service';
import { Hotel, Review, Reliability } from './../../../../models/Hotel';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input() reviews:Review[];
  @Input() page:number;
  totalItem:number=0
  constructor(private reviewSrv:ReviewsService) { }

  ngOnInit(): void {
    this.reviews = this.reviewSrv.getReviewsOfType(this.reviews,Reliability.TRUTH)
    this.totalItem = this.reviews.length;
    
  }

}
