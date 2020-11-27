import { Hotel } from './../../../models/Hotel';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelsService } from 'src/app/services/hotels.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit,OnDestroy{

  hotels:Hotel[];
  cityName:string;
  private subscription$: Subscription;

  constructor(private route:ActivatedRoute,private hotelsSrv:HotelsService,private router:Router) { }

  ngOnInit() {
    if(!this.route.snapshot.paramMap.get('cityName')){
      this.router.navigateByUrl('/'); //back to cities page
    }
    this.cityName = this.route.snapshot.paramMap.get('cityName');

    this.subscription$ =this.hotelsSrv.getCityHotels(this.cityName).subscribe(hotels=>{
      this.hotels = hotels;
      console.log(this.hotels);
      
    })

  }

  ngOnDestroy(){
    this.subscription$.unsubscribe();
  }

}