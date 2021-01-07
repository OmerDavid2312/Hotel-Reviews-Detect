import { ReviewsService } from './../../../../services/reviews.service';
import { Review, Reliability } from './../../../../models/Hotel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews-box',
  templateUrl: './reviews-box.component.html',
  styleUrls: ['./reviews-box.component.css']
})
export class ReviewsBoxComponent implements OnInit {
  @Input() reviews:Review[];
  @Input() truthReviewsCount:number;
  @Input() fakeReviewsCount:number;
  @Input() allReviewsCount:number;
  
  allReviews:{avg:number,count:number}
  fakeReviews:{avg:number,count:number}
  truthReviews:{avg:number,count:number}

  constructor(private reviewSrv:ReviewsService) { }

  ngOnInit(): void {
    this.allReviews = {
      avg: this.reviewSrv.getAVGreviews(this.reviews),
      count:this.allReviewsCount
    }

    let truthReviews = this.reviewSrv.getReviewsOfType(this.reviews,Reliability.TRUTH);
    let fakeReviews =  this.reviewSrv.getReviewsOfType(this.reviews,Reliability.DECEPTIVE);

    this.fakeReviews = {
      avg: this.reviewSrv.getAVGreviews(fakeReviews),
      count:this.fakeReviewsCount
    }

    this.truthReviews = {
      avg: this.reviewSrv.getAVGreviews(truthReviews),
      count:this.truthReviewsCount
    }


  }



}
