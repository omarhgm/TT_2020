import { Component } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  ionViewDidEnter() {
    this.buildMap();
  }

constructor() { }

buildMap() {
  mapboxgl.accessToken = 'pk.eyJ1Ijoib21hcjc3IiwiYSI6ImNrY3ZkNXVuYTAzNHMzMG5yeDJmaWp1ODUifQ.spAq7A_MdqTWtGkdKo8B_A';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
}

}
