import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as GeocodeService from 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';

@Injectable({
  providedIn: "root",
})
export class GeoService {
  constructor(private http: HttpClient) {}

  public getUserGeoLocation(): Promise<any> {
    return this.http.get("http://ip-api.com/json").toPromise();
  }
  
  public getGeoFromAdress(adress:string):Promise<any>{
    //@ts-ignore
    return new Promise((resolve,reject)=>{
      GeocodeService.geocode().text(adress).run(function (err, results, response) {
        if (err) {
         reject(err)
        }
        const geo = {
          lat: results.results[0].latlng.lat,
          long: results.results[0].latlng.lng
        };
        resolve(geo)
  
      });
    })

  }
}
