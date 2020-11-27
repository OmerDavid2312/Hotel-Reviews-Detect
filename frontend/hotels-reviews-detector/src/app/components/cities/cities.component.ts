import { CitiesService } from './../../services/cities.service';
import { City } from './../../models/City';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit,OnDestroy {
  cities:City[];
  private subscription$: Subscription;

  constructor(private citiesSrv:CitiesService) { }

  ngOnInit() {
    this.subscription$ = this.citiesSrv.getCities().subscribe(cities=>{
      this.cities = cities;      
    })
  }

  ngOnDestroy(){
    this.subscription$.unsubscribe();
  }

}
