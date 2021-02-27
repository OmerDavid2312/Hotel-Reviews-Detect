import { reviewCategory, ReviewsService } from "./../../../../services/reviews.service";
import { Hotel, Review, Reliability } from "./../../../../models/Hotel";
import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.component.html",
  styleUrls: ["./reviews.component.css"],
})
export class ReviewsComponent implements OnInit {
  @Input() reviews: Review[];
  @Input() page: number;
  totalItem: number = 0;
  categories: Array<{type:string,icon:string}>;
  allReviews: Review[];
  selectedFilteredCategory:reviewCategory | 'All' = 'All';
  constructor(private reviewSrv: ReviewsService) {}

  ngOnInit(): void {

    this.categories = this.reviewSrv.categories;
    this.reviews = this.reviewSrv.getReviewsOfType(
      this.reviews,
      Reliability.TRUTH
    );
    this.allReviews = [...this.reviews];
    this.totalItem = this.reviews.length;
    
  }

  filterByCategory(cateogry?: reviewCategory | 'All' ): Review[] { 
    return this.reviewSrv.getReviewsSortedByCategory([...this.allReviews],cateogry)
  }
  setActiveFilter(filter:reviewCategory | 'All'){
    this.selectedFilteredCategory = filter;
    this.reviews = this.filterByCategory(this.selectedFilteredCategory);    
    console.log(this.reviews);
    
    this.totalItem = this.reviews.length;
    this.page = 1
  }

  getIcon(rating):string{
    if(rating == 1){
      return "far fa-frown mr-1"
    }
    if(rating == 2){
      return "far fa-frown mr-1"
    }
    if(rating == 3){
      return "far fa-meh mr-1"
    }
    if(rating == 4){
      return "far fa-smile-beam mr-1"
    }
    if(rating == 5){
      return "far fa-smile-beam mr-1"
    }

  }
}
