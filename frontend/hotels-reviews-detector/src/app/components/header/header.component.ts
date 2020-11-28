import { Router } from '@angular/router';
import { WeatherService } from './../../services/weather.service';
import { GeoService } from './../../services/geo.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isLoggedIn:boolean = false
  name:string;
  geo
  weather;
  constructor(private authSrv:AuthService,private geoSrv:GeoService,private weatherSrv:WeatherService,private router:Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authSrv.isLoggedIn(); // change..
    this.name = localStorage.getItem('user');
    this.getGeoAndWeatherOfUser();
  }
  async getGeoAndWeatherOfUser(){
    this.geo = await this.geoSrv.getGeoLocation();
    this.weather = await this.weatherSrv.getWeather(this.geo.lat,this.geo.lon);
    console.log(this.geo,this.weather);
    
  }
  logout(){
    this.authSrv.logout();
    this.router.navigateByUrl('/login');
  }

}
