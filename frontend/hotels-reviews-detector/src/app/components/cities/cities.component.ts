import { WeatherService } from "./../../services/weather.service";
import { CitiesService } from "./../../services/cities.service";
import { City } from "./../../models/City";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-cities",
  templateUrl: "./cities.component.html",
  styleUrls: ["./cities.component.css"],
})
export class CitiesComponent implements OnInit, OnDestroy {
  cities: City[];

  private subscription$: Subscription;
  isFetched: boolean = false;

  //paging
  page: number = 1;
  totalItem: number;

  constructor(
    private citiesSrv: CitiesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.spinner.show();

    this.subscription$ = this.citiesSrv.getCities(this.page).subscribe(
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
    //unsubscribe for ReSubscribe again in the func
    this.subscription$.unsubscribe();
    this.getCities();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
