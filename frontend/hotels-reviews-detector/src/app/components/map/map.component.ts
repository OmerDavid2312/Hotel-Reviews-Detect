import { GeoService } from "./../../services/geo.service";
import { Component, Input, OnInit } from "@angular/core";
import * as L from "leaflet";
@Component({
  selector: "map-component",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  @Input() center;
  @Input() landMarkName:string;

  constructor() {}

  icon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 0],
      iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.0.3/dist/images/marker-shadow.png",
    }),
  };

  ngOnInit() {
    const map = L.map("map").setView(
      new L.LatLng(this.center.lat, this.center.long),
      13
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    
    const marker = L.marker(
      [this.center.lat, this.center.long],
      this.icon
    ).addTo(map);

     marker.bindPopup(`<b>${this.landMarkName}</b><br>`).openPopup();
    
  }
}
