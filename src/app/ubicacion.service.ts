import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Subscription } from 'rxjs';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
//plugin
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  policia: AngularFirestoreDocument<any>;//manejar cualquier tipo de estructura de policia
  private watch: Subscription;
  constructor(
              private geolocation: Geolocation,
              public  _usuarioServ: UsuarioService,
              private afDB: AngularFirestore      //angular firestore database
             ) {}

  inicializarPolicia(){
    this.policia = this.afDB.doc('/policias/'+this._usuarioServ.clave);
  }


  iniciarGeolocalizacion(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      //console.log(resp.coords);  
    }).catch((error) => {
      console.log('Error getting location', error);
    });     
    
    this.watch = this.geolocation.watchPosition()
      .subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        //data.coords.longitude
        //console.log('Watch: ',data.coords);
        this.policia.update({    //remplaza o crea la propiedad          
          lat: data.coords.latitude,
          lng: data.coords.longitude,
          clave: this._usuarioServ.clave//optional
        });
        console.log(this.policia);
      });

  }

  detenerUbicacion(){
    try{
      this.watch.unsubscribe();
    }catch(e){
      console.log(JSON.stringify(e));
    }
  }

}
