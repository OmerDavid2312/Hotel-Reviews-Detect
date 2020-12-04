import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private baseURL:string = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getCities():Observable<any>{
    return this.http.get(`${this.baseURL}/cities`);
  }

  public getCityDetails(cityName:string):Observable<any>{
    return this.http.get(`${this.baseURL}/cities/${cityName}`);
  }
}
