import { Hotel } from './../../../models/Hotel';
import { HotelsService } from './../../../services/hotels.service';
import { GeoService } from './../../../services/geo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotels-near-by',
  templateUrl: './hotels-near-by.component.html',
  styleUrls: ['./hotels-near-by.component.css']
})
export class HotelsNearByComponent implements OnInit {

  center;
  hotels:Hotel[];
  isFetched:boolean = false;

  constructor(private geoSrv:GeoService,private hotelSrv:HotelsService) { }

  ngOnInit(): void {
    this.geoSrv.getGeoLocation().subscribe(geo=>{
      this.center = {lat:geo.lat,long:geo.lon};
      this.hotelSrv.getHotelsNearBy(geo.country).subscribe(hotels=>{
        this.hotels = hotels;
        this.isFetched = true;  
      })
      
   })

  
  }

}
