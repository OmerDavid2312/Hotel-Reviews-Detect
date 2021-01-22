import { WeatherService } from "./../../services/weather.service";
import { CitiesService } from "./../../services/cities.service";
import { City } from "./../../models/City";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { take } from "rxjs/operators";

@Component({
  selector: "app-cities",
  templateUrl: "./cities.component.html",
  styleUrls: ["./cities.component.css"],
})
export class CitiesComponent implements OnInit {
  cities: City[];
  isFetched: boolean = false;

  //paging
  page: number = 1;
  totalItem: number;

  searchText:string = "";

  constructor(
    private citiesSrv: CitiesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.spinner.show();

  this.citiesSrv.getCities(this.page)
      .pipe(take(1))
      .subscribe(
      (cities) => {
        this.cities = cities.data;
        this.totalItem = cities.count;

        this.isFetched = true;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  pageChanged(e) {
    this.page = e;
    this.getCities();
  }

}
