import { Reliability, Review, ReviewStats } from "./../models/Hotel";
import { Injectable } from "@angular/core";
export type reviewCategory =   "service"  |"room" | "location" | "food" | "cleanliness"

@Injectable({
  providedIn: "root",
})
export class ReviewsService {
  public categories:Array<{type:string,icon:string}> = [
    {type:"service",icon:"fas fa-concierge-bell"},
    // {type:"price",icon:"fas fa-dollar-sign"},
    {type: "room",icon:"fab fa-intercom"},
    {type:"location",icon:"fas fa-map-marker-alt"},
    {type: "food",icon:"fas fa-utensils"},
    {type:"cleanliness",icon:"fas fa-broom"},
  ]
  constructor() {}

  public getReviewsStat(reviews: Review[]): ReviewStats {
    return {
      fake: {
        count: this.getReviewsTypeCounts(reviews, Reliability.DECEPTIVE),
        avg: this.getAVGreviews(reviews, Reliability.DECEPTIVE),
        ratingCount: this.getCountOfRatings(reviews, Reliability.DECEPTIVE),
      },
      truth: {
        count: this.getReviewsTypeCounts(reviews, Reliability.TRUTH),
        avg: this.getAVGreviews(reviews, Reliability.TRUTH),
        ratingCount: this.getCountOfRatings(reviews, Reliability.TRUTH),
      },
      all: {
        count: this.getReviewsTypeCounts(reviews),
        avg: this.getAVGreviews(reviews),
        ratingCount: this.getCountOfRatings(reviews),
      },
    };
  }
  //@desc return reviews avg
  private getAVGreviews(reviews: Review[], type?: Reliability): number {
    type
      ? (reviews = this.getReviewsOfType(reviews, type))
      : (reviews = this.getReviewsOfType(reviews));

    let ratings =
      reviews.map((review) => review.rating).reduce((a, b) => a + b, 0) /
      reviews.length;
    return Number(ratings.toFixed(2));
  }

  //@desc return reviews from type
  public getReviewsOfType(reviews: Review[], type?: Reliability): Review[] {
    if (type) {
      return reviews.filter((review) => review.reliability === type);
    }
    return reviews;
  }
  //@desc return number of reviews from type
  private getReviewsTypeCounts(reviews: Review[], type?: Reliability): number {
    if (type) {
      return Number(
        reviews.filter((review) => review.reliability === type).length
      );
    }
    return Number(reviews.length);
  }

  //@desc return ratings count
  private getCountOfRatings(reviews: Review[], type?: Reliability): Object {
    type
      ? (reviews = this.getReviewsOfType(reviews, type))
      : (reviews = this.getReviewsOfType(reviews));
    return reviews
      .map((review) => review.rating)
      .reduce((r, c) => ((r[c] = (r[c] || 0) + 1), r), {});
  }

   //@desc getReviewsSortedByCategory
  public getReviewsSortedByCategory(reviews: Review[],categoryName?:reviewCategory | 'All'):Review[] {
    if(categoryName !== 'All'){
      return reviews.filter((review) => review.categories.includes(categoryName) );
    }
    return reviews
  }
}
