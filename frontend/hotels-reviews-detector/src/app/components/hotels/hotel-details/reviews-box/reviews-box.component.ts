import { ReviewStats } from "./../../../../models/Hotel";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-reviews-box",
  templateUrl: "./reviews-box.component.html",
  styleUrls: ["./reviews-box.component.css"],
})
export class ReviewsBoxComponent implements OnInit {
  @Input() reviewStats: ReviewStats;

  constructor() {}

  ngOnInit(): void {
    console.log(this.reviewStats);
  }

}
