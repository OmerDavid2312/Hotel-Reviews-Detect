import { Hotel } from './../../../models/Hotel';
import { HotelsService } from './../../../services/hotels.service';
import { GeoService } from './../../../services/geo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hotels-near-by',
  templateUrl: './hotels-near-by.component.html',
  styleUrls: ['./hotels-near-by.component.css']
})
export class HotelsNearByComponent implements OnInit,OnDestroy {


  hotels:Hotel[];
  hotelsCount:number;

  private userGeoLocationSubscription$: Subscription;
  private hotelsNearBySubscription$: Subscription;

  constructor(private geoSrv:GeoService,private hotelSrv:HotelsService) { }

  ngOnInit(): void {
    this.userGeoLocationSubscription$ = this.geoSrv.getUserGeoLocation().subscribe(geo=>{
      this.hotelsNearBySubscription$ = this.hotelSrv.getHotelsNearBy(geo.country).subscribe(hotels=>{
        this.hotels = hotels;
        this.hotelsCount = hotels.length;
      })
   })
  }

  ngOnDestroy(){
    this.userGeoLocationSubscription$.unsubscribe();
    this.hotelsNearBySubscription$.unsubscribe();
  }

}
