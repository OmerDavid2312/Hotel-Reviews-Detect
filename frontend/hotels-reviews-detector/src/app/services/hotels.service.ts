import { Hotel } from './../models/Hotel';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HotelsService {
  private baseURL: string = "https://hotels-inside-server.herokuapp.com/api";

  constructor(private http: HttpClient) {}

  public getCityHotels(cityName: string, currentPage: number): Observable<any> {
    return this.http.get<{count:number,data:Hotel[]}>(
      `${this.baseURL}/hotels/${cityName}?page=${currentPage}`
    );
  }

  public getHotelDetails(hotelId: string, cityName: string): Observable<any> {
    return this.http.get<Hotel>(`${this.baseURL}/hotels/${cityName}/${hotelId}`);
  }
  public getSortedHotelsByField(
    cityName: string,
    field: string,
    sortType: string,
    currentPage: number
  ): Observable<any> {
    return this.http.get(
      `${this.baseURL}/hotels/${cityName}?page=${currentPage}&field=${field}&sort=${sortType}`
    );
  }
  public getHotelsNearBy(country: string): Promise<any> {
    return this.http
      .get(`${this.baseURL}/hotels/hotelsnearby/${country}`)
      .toPromise();
  }


  public getFavoriteHotels(): Observable<any>{
    return this.http
    .get<Hotel[]>(`${this.baseURL}/hotels/favorite`)
  }

  public addHotelToFavorite(hotelId:string): Observable<any>{
    return this.http
    .patch(`${this.baseURL}/hotels/favorite/${hotelId}`,{_id:hotelId})
  }

}
