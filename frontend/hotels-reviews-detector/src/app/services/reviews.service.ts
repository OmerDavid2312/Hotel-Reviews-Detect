import { Reliability, Review } from './../models/Hotel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { }

   getAVGreviews(reviews:Review[]):number{
    let ratings = reviews.map(review=>review.rating).reduce((a,b)=> a+b,0)/reviews.length;
     return Number(ratings.toFixed(2));
   }

   getReviewsOfType(reviews:Review[],type:Reliability):Review[]|[]{
    if(type){
      return reviews.filter(review=> review.reliability === type);
    }
    return [];
   }

   getCountOfRatings(reviews:Review[],num:1|2|3|4|5):number{
     return Number(reviews.filter(review=>review.rating === num).length)
   }
}
