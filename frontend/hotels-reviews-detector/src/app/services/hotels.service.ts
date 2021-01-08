import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private baseURL:string = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getCityHotels(cityName:string,currentPage:number):Observable<any>{
    return this.http.get(`${this.baseURL}/hotels/${cityName}?page=${currentPage}`);
  }

  public getHotelDetails(hotelId:string,cityName:string):Observable<any>{
    return this.http.get(`${this.baseURL}/hotels/${cityName}/${hotelId}`);
  }
  public getSortedHotelsByField(cityName:string,field:string,sortType:string,currentPage:number):Observable<any>{
    return this.http.get(`${this.baseURL}/hotels/${cityName}?page=${currentPage}&field=${field}&sort=${sortType}`);
  }
  public getHotelsNearBy(country:string):Promise<any>{
    return this.http.get(`${this.baseURL}/hotels/hotelsnearby/${country}`).toPromise();
  }
}
