import { CitiesService } from './../../services/cities.service';
import { City } from './../../models/City';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  cities:City[];

  constructor(private citiesSrv:CitiesService) { }

  ngOnInit() {
    this.citiesSrv.getCities().subscribe(cities=>{
      this.cities = cities;      
    })
  }

}
