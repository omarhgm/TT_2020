import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  clave: string; 
  user: any = {};
  private doc: Subscription;
  //ṕara grabar informacion
  constructor(
              private afDB: AngularFirestore,
              private platform: Platform,
              private storage: Storage
             )  {}

  verificaUsuario(clave: string){
    
    clave = clave.toLocaleLowerCase();//pasar a minusculas
    
    return new Promise((resolve,reject) => {
      console.log(clave)
      this.doc = this.afDB.doc('/policias/'+clave)
          .valueChanges().subscribe( data => {
            if(data){
              this.clave= clave;
              this.user= data;
              this.guardarStorage();
              resolve(true);
            }else{              
              resolve(false);
            }                        
          })
                      
    });
    //promesa es algo asincrono tiene
  }
  //trabajar con el storage hay  2 formas
  //navegador web localstorage, aplicacion Ionic storage nativo
  
  guardarStorage(){
    //si estamos en un dispositivo o si estamos en una PC
    if(this.platform.is('cordova')){
      //Celular
      this.storage.set('clave',this.clave); //grabar en dispositivo 
    }else{
      //Escritorio
      localStorage.setItem('clave',this.clave);
    }
  }
  
  cargarStorage(){
    return new Promise( (resolve,reject) => {
      //si estamos en un dispositivo o si estamos en una PC
      if(this.platform.is('cordova')){
        //Celular
        this.storage.get('clave').then( val => {
          if( val){
            this.clave = val;
            resolve(true);
          }else{
            resolve(false);
          }
        });

      }else{
        //Escritorio
        if(localStorage.getItem('clave')){
          this.clave = localStorage.getItem('clave');
          resolve(true);
        }else{
          resolve(false);
        }

      }

    });
  
  }
  
  borrarUsuario(){
    this.clave=null;
    if(this.platform.is('cordova')){
      this.storage.remove('clave');
    }else{
      localStorage.removeItem('clave');
    }
    this.doc.unsubscribe();
  }


}
