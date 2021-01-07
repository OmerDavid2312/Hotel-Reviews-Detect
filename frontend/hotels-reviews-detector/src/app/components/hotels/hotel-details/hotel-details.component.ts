import { ReviewsService } from './../../../services/reviews.service';
import { Hotel, Review, Reliability } from './../../../models/Hotel';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { HotelsService } from 'src/app/services/hotels.service';


@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit,OnDestroy {

  hotel:Hotel;
  hotelId:string;
  cityName:string;
  isFetched:boolean = false;
  
  private subscription$: Subscription;

  //paging
  page:number = 1;
  totalItem:number;

  constructor(private route:ActivatedRoute,private hotelsSrv:HotelsService,private router:Router,private spinner:NgxSpinnerService,private reviewSrv:ReviewsService) { }

  ngOnInit() {
    if(!this.route.snapshot.paramMap.get('cityName') && !this.route.snapshot.paramMap.get('hotelId')){
      this.router.navigateByUrl('/'); //back to cities page
    }
    this.hotelId = this.route.snapshot.paramMap.get('hotelId');
    this.cityName = this.route.snapshot.paramMap.get('cityName');
    
    this.spinner.show();
    this.subscription$ =this.hotelsSrv.getHotelDetails(this.hotelId, this.cityName).subscribe(hotel=>{
      this.spinner.hide();
      this.isFetched = true;
      this.hotel = hotel;          
    },err=>{
      this.spinner.hide();
    })

  }

  pageChanged(e){
    this.page = e; 
    if(this.subscription$){
      this.subscription$.unsubscribe();
    }
      
  }

  ngOnDestroy(){
    if(this.subscription$){
      this.subscription$.unsubscribe();
    }
  }

}
