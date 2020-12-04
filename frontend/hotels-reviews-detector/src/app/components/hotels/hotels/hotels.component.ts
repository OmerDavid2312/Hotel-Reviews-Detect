import { City } from './../../../models/City';
import { CitiesService } from './../../../services/cities.service';
import { Hotel } from './../../../models/Hotel';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelsService } from 'src/app/services/hotels.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit,OnDestroy{

  hotels:Hotel[];
  cityName:string;
  cityDetails:City;
  isFetched:boolean = false;

  private cityHotelSubscription$: Subscription;
  private cityDetailsSubscription$: Subscription;

  constructor(private route:ActivatedRoute,private hotelsSrv:HotelsService,private router:Router, private citiesSrv:CitiesService, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    if(!this.route.snapshot.paramMap.get('cityName')){
      this.router.navigateByUrl('/'); //back to cities page
    }
    this.cityName = this.route.snapshot.paramMap.get('cityName');
    this.spinner.show();
    
    this.cityHotelSubscription$ =this.hotelsSrv.getCityHotels(this.cityName).subscribe(hotels=>{
      this.hotels = hotels;
      
      this.cityDetailsSubscription$ = this.citiesSrv.getCityDetails(this.cityName).subscribe(cityDetails=>{
        this.cityDetails = cityDetails;

        this.spinner.hide();
        this.isFetched = true;

      },err=>{
      this.spinner.hide();
     })      
    },err=>{
      this.spinner.hide();
    })

  }

  ngOnDestroy(){
    this.cityHotelSubscription$.unsubscribe();
    this.cityDetailsSubscription$.unsubscribe();    
  }

}
