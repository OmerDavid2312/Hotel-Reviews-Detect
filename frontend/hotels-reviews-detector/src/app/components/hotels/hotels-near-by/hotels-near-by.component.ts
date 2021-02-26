import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Hotel } from './../../../models/Hotel';
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
  hotels:Hotel[];
  count:number;
  isFetched:boolean=false;

  constructor(private hotelSrv:HotelsService,private geoSrv:GeoService,private spinner:NgxSpinnerService,     private router: Router,
    private toastSrv: ToastrService    ) { }

  ngOnInit(): void {
    this.spinner.show();
  
    navigator.geolocation.getCurrentPosition(position=>{
        
      var long = position.coords.longitude; 
      var lat = position.coords.latitude;
     this.geoSrv.getUserGeoLocation(lat,long).then(geo=>{
       
       this.geo = geo
       
      this.hotelSrv.getHotelsNearBy(geo.country).then(hotels=>{
        
        this.hotels=hotels.data;
        
        this.count = hotels.count;
        this.isFetched = true;
        this.spinner.hide();
  
          
        }).catch(()=>this.spinner.hide())
     })
     
      




  },()=>{
    this.toastSrv.warning("Location denied , redirect to homepage");
    this.router.navigateByUrl("/");
    this.spinner.hide();
  });

    

      
   
  }

}
