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
  isFetched:boolean = false;
  private subscription$: Subscription;

  constructor(private route:ActivatedRoute,private hotelsSrv:HotelsService,private router:Router,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    if(!this.route.snapshot.paramMap.get('cityName')){
      this.router.navigateByUrl('/'); //back to cities page
    }
    this.cityName = this.route.snapshot.paramMap.get('cityName');
    this.spinner.show();
    this.subscription$ =this.hotelsSrv.getCityHotels(this.cityName).subscribe(hotels=>{
      this.spinner.hide();
      this.isFetched = true;
      this.hotels = hotels;
      console.log(this.hotels);
      
    },err=>{
      this.spinner.hide();
    })

  }

  ngOnDestroy(){
    this.subscription$.unsubscribe();
  }

}
