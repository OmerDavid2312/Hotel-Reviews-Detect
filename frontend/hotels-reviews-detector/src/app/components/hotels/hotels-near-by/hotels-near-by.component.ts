import { NgxSpinnerService } from 'ngx-spinner';
import { GeoService } from './../../../services/geo.service';
import { HotelsService } from './../../../services/hotels.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotels-near-by',
  templateUrl: './hotels-near-by.component.html',
  styleUrls: ['./hotels-near-by.component.css']
})
export class HotelsNearByComponent implements OnInit {
  geo;
  hotels;

  isFetched:boolean=false;
  constructor(private hotelSrv:HotelsService,private geoSrv:GeoService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.geoSrv.getUserGeoLocation().then(geo=>{

      this.geo = geo;

      this.hotelSrv.getHotelsNearBy(geo.country).then(hotels=>{

      this.hotels=hotels
      this.isFetched = true;
      this.spinner.hide();

        
      }).catch(()=>this.spinner.hide())
      
    }).catch(()=>this.spinner.hide())
  }

}
