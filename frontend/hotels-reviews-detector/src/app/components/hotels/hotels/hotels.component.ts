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
  Subscription
} from "rxjs";
import {
  NgxSpinnerService
} from "ngx-spinner";

@Component({
  selector: "app-hotels",
  templateUrl: "./hotels.component.html",
  styleUrls: ["./hotels.component.css"],
})
export class HotelsComponent implements OnInit, OnDestroy {
  hotels: Hotel[];
  cityName: string;
  cityDetails: City;
  isFetched: boolean = false;

  private cityHotelSubscription$: Subscription;
  private cityDetailsSubscription$: Subscription;

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
      this.cityHotelSubscription$ = this.hotelsSrv.getSortedHotelsByField(this.route.snapshot.paramMap.get("cityName"), 'class', 'desc', this.page)
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

    this.cityHotelSubscription$ = this.hotelsSrv
      .getCityHotels(this.cityName, this.page)
      .subscribe(
        (hotels) => {
          this.hotels = hotels.data;
          this.totalItem = hotels.count;

          this.cityDetailsSubscription$ = this.citiesSrv
            .getCityDetails(this.cityName)
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
    if (this.cityHotelSubscription$) {
      this.cityHotelSubscription$.unsubscribe();
    }
    if (this.cityDetailsSubscription$) {
      this.cityDetailsSubscription$.unsubscribe();
    }
    this.sort(this.activeSort)
  }

  ngOnDestroy() {
    if (this.cityHotelSubscription$) {
      this.cityHotelSubscription$.unsubscribe();
    }
    if (this.cityDetailsSubscription$) {
      this.cityDetailsSubscription$.unsubscribe();
    }
  }
}
