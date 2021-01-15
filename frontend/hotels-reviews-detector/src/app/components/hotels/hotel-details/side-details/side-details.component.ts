import { GeoService } from '../../../../services/geo.service';
import { ReviewStats } from "../../../../models/Hotel";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-reviews-box",
  templateUrl: "./side-details.component.html",
  styleUrls: ["./side-details.component.css"],
})
export class SideDetailsComponent implements OnInit {
  @Input() reviewStats: ReviewStats;
  @Input() hotelAddress:string;
  @Input() hotelName:string;

  hotelGeo:{lat:number,long:number};

  isFetched:boolean = false;

  constructor(private geoSrv:GeoService) {}

  ngOnInit(): void {

     this.geoSrv.getGeoFromAdress(this.hotelAddress).then(geo=>{
      this.hotelGeo = geo;
      this.isFetched = true;
      
    });
    
  }

}
