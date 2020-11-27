import { WeatherService } from './../../services/weather.service';
import { CitiesService } from './../../services/cities.service';
import { City } from './../../models/City';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit,OnDestroy {
  cities:City[];
  private subscription$: Subscription;
  isFetched:boolean = false;

  constructor(private citiesSrv:CitiesService,private weatherSrv:WeatherService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.subscription$ = this.citiesSrv.getCities().subscribe(cities=>{          
      this.isFetched = true;
      this.spinner.hide();
      this.cities = cities; 
    },err=>{
      this.spinner.hide();
    })
  }
  
  ngOnDestroy(){
    this.subscription$.unsubscribe();
  }

}
