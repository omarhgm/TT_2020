import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from '../config/firebase.config';
import { IonicStorageModule } from '@ionic/storage';

//Service
import { UbicacionService } from './ubicacion.service';
import { UsuarioService } from "./usuario.service";

//plugins
import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
            BrowserModule,
            AppRoutingModule,
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFirestoreModule,
            IonicModule.forRoot(),
            IonicStorageModule.forRoot()              
           ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UsuarioService,
    UbicacionService,
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
