import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as GeocodeService from 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder';
import { geoJSON, latLng } from "leaflet";


@Injectable({
  providedIn: "root",
})
export class GeoService {
  constructor(private http: HttpClient) {}

  public getUserGeoLocation(lat,long):Promise<any>  {
    return new Promise((res,rej)=>{
      GeocodeService.reverseGeocode().latlng([lat, long]).language('en').run(function (err, results, response) {
        
        if(results.address.CountryCode === 'ISR'){
          res({country:'Israel',lat,lon:long,city:results.address.City});
        } else{
          res({country:results.address.CountryCode,lat,lon:long,city:results.address.City})
        }
         
     })
    })



      
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
