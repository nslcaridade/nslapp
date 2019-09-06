import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/api/register.service';
import { Util } from '../commons/util';
import { LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from "../services/database/database.service"
import { InstitutionService } from '../services/api/institution.service';
import { BazarService } from '../services/api/bazar.service'
import { MenuService } from '../services/api/menu.service';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  allInstitutions: any;
  allBazares: any;
  customTextMenu: any;

  ngOnInit() {
    this.localizaUsuario();
  }

  ionViewWillEnter(){
    this.localizaUsuario();
  }
  
  constructor(
    private router: Router,
    public alertController: AlertController,
    public registerAPI: RegisterService,
    public dataBase :DatabaseService,
    public institutionAPI :InstitutionService,
    public bazarAPI :BazarService,
    public loadingController: LoadingController,
    public menuAPI :MenuService,
    public util: Util) {
      
  }
  
  localizaUsuario(){
    this.dataBase.getValue('NSL')
    .then(
        data => {
        if ( data !== null ){
          this.localizaInstituicao();
          this.bazarList();
          this.getMenuText();
          //this.presentLoading();
          this.router.navigate(['menu'] );
        } else {
          this.router.navigate(['start'] );
        }
    });
  }

  localizaInstituicao(){
    this.institutionAPI.getAllInstitutions()
      .subscribe( (instit: any) => {
        this.allInstitutions = JSON.parse(JSON.stringify(instit.listaInstituicao));
        this.dataBase.setKeyValue('INST',this.allInstitutions);
      }, err => {

      });
  }

  bazarList(): void {
    this.bazarAPI.getAllBazares()
      .subscribe( (bazar: any) => {
        this.allBazares = JSON.parse(JSON.stringify(bazar.ltBazar));
        this.dataBase.setKeyValue('BAZ',this.allBazares);
      }, err => {
      });
    }

  getMenuText(): void {

      this.menuAPI.getMsg()
        .subscribe( (data: any) => {
          this.customTextMenu = JSON.parse(JSON.stringify(data.mensagem));
          this.dataBase.removeKey('MSG');
          this.dataBase.setKeyValue('MSG',data.mensagem);
        }, err => {
  
        });
    }

    


    async presentLoading() {
      const loading = await this.loadingController.create({
        message: 'Aguarde...',
        duration: 5000
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
  
      console.log('Loading dismissed!');
    }

  
}

