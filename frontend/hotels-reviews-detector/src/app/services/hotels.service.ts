import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private baseURL:string = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getCityHotels(cityName:String):Observable<any>{
    return this.http.get(`${this.baseURL}/hotels/${cityName}`);
  }

  public getHotelDetails(cityName:String , hotelId:String):Observable<any>{
    return this.http.get(`${this.baseURL}/hotels/${cityName}/${hotelId}`);
  }
}
