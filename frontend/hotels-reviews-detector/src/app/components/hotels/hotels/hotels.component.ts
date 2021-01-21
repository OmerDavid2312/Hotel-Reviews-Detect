import {
  City
} from "./../../../models/City";
import {
  CitiesService
} from "./../../../services/cities.service";
import {
  Hotel
} from "./../../../models/Hotel";
import {
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import {
  ActivatedRoute,
  Router
} from "@angular/router";
import {
  HotelsService
} from "src/app/services/hotels.service";

import {
  NgxSpinnerService
} from "ngx-spinner";
import { take } from "rxjs/operators";

@Component({
  selector: "app-hotels",
  templateUrl: "./hotels.component.html",
  styleUrls: ["./hotels.component.css"],
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[];
  cityName: string;
  cityDetails: City;
  isFetched: boolean = false;


  //paging
  page: number = 1;
  totalItem: number;

  activeSort: 'All' | 'Class' = 'All'

  constructor(
    private route: ActivatedRoute,
    private hotelsSrv: HotelsService,
    private router: Router,
    private citiesSrv: CitiesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getHotelsCity();
  }
  sort(sortType: 'All' | 'Class') {
    if (sortType === 'All') {
      if (this.activeSort === 'Class') {
        this.page = 1;
      }
      this.getHotelsCity();
      this.activeSort = 'All';
    }
    if (sortType === 'Class') {
      if (this.activeSort === 'All') {
        this.page = 1;
      }
      this.spinner.show();
      this.hotelsSrv.getSortedHotelsByField(this.route.snapshot.paramMap.get("cityName"), 'class', 'desc', this.page)
      .pipe(take(1))
      .subscribe(hotels => {
          this.hotels = hotels.data;
          this.totalItem = hotels.count;
          this.activeSort = 'Class';
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
        })
    }

  }
  getHotelsCity() {
    if (!this.route.snapshot.paramMap.get("cityName")) {
      this.router.navigateByUrl("/"); //back to cities page
    }
    this.cityName = this.route.snapshot.paramMap.get("cityName");
    this.spinner.show();

    this.hotelsSrv
      .getCityHotels(this.cityName, this.page)
      .pipe(take(1))
      .subscribe(
        (hotels) => {
          this.hotels = hotels.data;
          this.totalItem = hotels.count;

          this.citiesSrv
            .getCityDetails(this.cityName)
            .pipe(take(1))
            .subscribe(
              (cityDetails) => {
                this.cityDetails = cityDetails;

                this.spinner.hide();
                this.isFetched = true;
              },
              (err) => {
                this.spinner.hide();
              }
            );
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  pageChanged(e) {
    this.page = e;
    this.sort(this.activeSort)
  }

}
