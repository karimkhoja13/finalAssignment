import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-test',
  templateUrl: './map-test.component.html',
  styleUrl: './map-test.component.css'
})
export class MapTestComponent implements OnInit {
  // private map!: L.Map

  // constructor(){}

  ngOnInit(): void {
    // this.showMap()
  }

  // showMap() {
  //   this.map = L.map('mapid').setView([49.27, -123], 11);

  //   const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 19,
  //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

  //   }).addTo(this.map);
  // }
}
