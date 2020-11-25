import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseURL:string = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getWeather(lat:Number,long:Number):Observable<any>{
    return this.http.get(`${this.baseURL}/weather/${lat}/${long}`);
  }
}
