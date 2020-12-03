// import * as L from 'leaflet';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // map
  constructor() { }
 
  ngOnInit() {
  }

  // initMap(){
  //   // this.map = L.map('map').setView([32.339444,-6.38033],15)
  //   // console.log(this.map);
  //   // const tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
  //   // tiles.addTo(this.map);
  // }

}
