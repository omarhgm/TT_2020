import { Component, ViewChild,ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { UbicacionService } from '../ubicacion.service';
import { UsuarioService } from '../usuario.service';

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage  {
  
  map: any;
  lat: number;
  lng: number;  
  name: string;
  
  @ViewChild('map',{read: ElementRef, static: false}) mapRef: ElementRef;
  

    user: any= {};
      constructor(
              public _ubicacionServ: UbicacionService,       
              private router: Router,
              public _usuarioServ: UsuarioService
             ){
                this._ubicacionServ.iniciarGeolocalizacion();   
                this._ubicacionServ.inicializarPolicia(); 
                this._ubicacionServ.policia.valueChanges()
                        .subscribe( data => {
                          this.user= data;
                          this.lat= this.user.lat;
                          this.lng= this.user.lng;                          
                          this.name= this.user.nombre;
                          this.showMap();
                        });
              }
  
  
  addMarkerstoMap(){
    let position = new google.maps.LatLng(this.lat,this.lng);
    let mapMarker = new google.maps.Marker({
      position: position,
      title: this.name,
      latitude: this.lat,
      longitude: this.lng
    });
    mapMarker.setMap(this.map);
  }
 
  
  showMap(){  
    const location = new google.maps.LatLng(this.lat,this.lng);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkerstoMap();
  }

  salir(){
    this._ubicacionServ.detenerUbicacion();
    this._usuarioServ.borrarUsuario();
    this.router.navigate(['/tabs']);    

  }

}
