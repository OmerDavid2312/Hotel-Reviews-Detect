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
  
  allReviewsInfo:{avg:number,count:number}
  fakeReviewsInfo:{avg:number,count:number}
  truthReviewsInfo:{avg:number,count:number}

  constructor(private reviewSrv:ReviewsService) { }

  ngOnInit(): void {
    this.allReviewsInfo = {
      avg: this.reviewSrv.getAVGreviews(this.reviews),
      count:this.allReviewsCount
    }

    let truthReviews = this.reviewSrv.getReviewsOfType(this.reviews,Reliability.TRUTH);
    let fakeReviews =  this.reviewSrv.getReviewsOfType(this.reviews,Reliability.DECEPTIVE);

    this.fakeReviewsInfo = {
      avg: this.reviewSrv.getAVGreviews(fakeReviews),
      count:this.fakeReviewsCount
    }

    this.truthReviewsInfo = {
      avg: this.reviewSrv.getAVGreviews(truthReviews),
      count:this.truthReviewsCount
    }

    console.log('1 =>', this.reviewSrv.getCountOfRatings(truthReviews,1));
    console.log('2 =>', this.reviewSrv.getCountOfRatings(truthReviews,2));
    console.log('3 =>', this.reviewSrv.getCountOfRatings(truthReviews,3));
    console.log('4 =>', this.reviewSrv.getCountOfRatings(truthReviews,4));
    console.log('5 =>', this.reviewSrv.getCountOfRatings(truthReviews,5));

  }

}
