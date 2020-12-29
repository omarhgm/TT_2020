import { Component,ViewChild} from '@angular/core';
import { IonSlides, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

 
  @ViewChild(IonSlides) slides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400,        
  };
  constructor(
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public _usuarioServ: UsuarioService,
              private router: Router
             ) {} 
  
  ionViewWillEnter(){        
      this.slides.lockSwipes(true);    
  }
  
  async mostrarInput(){
    const alert = await this.alertCtrl.create({
      header: 'Ingrese el usuario',
      inputs: [{name: 'clave', placeholder: 'Introducir Clave'}],
      buttons: [{text: 'Cancelar', role:'cancel'},
                { text: 'Ingresar', handler: data => {
                  //console.log(data);
                  this.verificarUsuario(data.clave)
                } 
      }]
    });
     alert.present();
  } 

  async verificarUsuario(clave: string){
    let loading = await this.loadingCtrl.create({
      message: 'Verificando...'
    });
    await  loading.present();
    
    this._usuarioServ.verificaUsuario(clave)
            .then(async existe => {
              loading.dismiss();
              if(existe){
                this.slides.lockSwipes(false);
                this.slides.slideNext();
                this.slides.lockSwipes(true);
              }else{
                (await this.alertCtrl.create({
                  header: 'Usuario Incorrecto',
                  subHeader: 'Hable con el administrador o intente de nuevo',
                  buttons: ['Aceptar']
                })).present();
              }

            })
          
  }

  continuar(){
    this.router.navigate(['/maps']);
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);    
  }
  
}
