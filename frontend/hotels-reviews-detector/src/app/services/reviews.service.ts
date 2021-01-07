import { Reliability } from './../models/Hotel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { }

   getAVGreviews(reviews){
    let ratings = reviews.map(review=>review.rating).reduce((a,b)=> a+b,0)/reviews.length;
     return Number(ratings.toFixed(2));
   }

   getReviewsOfType(reviews,type:Reliability){
    if(type){
      return reviews.filter(review=> review.reliability === type);
    }
    return [];
   }
}
