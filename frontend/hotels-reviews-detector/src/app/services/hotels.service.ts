import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private baseURL:string = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getCityHotels(cityName:string):Observable<any>{
    return this.http.get(`${this.baseURL}/hotels/${cityName}`);
  }

  public getHotelDetails(hotelId:string):Observable<any>{
    return this.http.get(`${this.baseURL}/hotels/${hotelId}`);
  }
  public getSortedHotelsByField(cityName:string,field:string,sortType:string):Observable<any>{
    return this.http.get(`${this.baseURL}/hotels/${cityName}/${field}/${sortType}`);
  }
}
