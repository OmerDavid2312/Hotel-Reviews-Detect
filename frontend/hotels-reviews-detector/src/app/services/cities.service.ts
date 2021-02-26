import { City } from './../models/City';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CitiesService {
  private baseURL: string = "https://hotels-inside-server.herokuapp.com/api";

  constructor(private http: HttpClient) {}

  public getCities(currentPage: number): Observable<any> {
    return this.http.get<{count:number,data:City[]}>(`${this.baseURL}/cities?page=${currentPage}`);
  }

  public getCityDetails(cityName: string): Observable<any> {
    return this.http.get<City>(`${this.baseURL}/cities/${cityName}`);
  }
}
