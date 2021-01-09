import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GeoService {
  constructor(private http: HttpClient) {}

  public getUserGeoLocation(): Promise<any> {
    return this.http.get("http://ip-api.com/json").toPromise();
  }
}
