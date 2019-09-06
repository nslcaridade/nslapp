import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/api/register.service';
import { Util } from '../../commons/util';
import { LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from "../../services/database/database.service"

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  image: string;

  user: any;
  allInstitutions: any;
  allBazares: any;
  customTextMenu: any;

  constructor(
    private router: Router,
    public alertController: AlertController,
    public registerAPI: RegisterService,
    public dataBase :DatabaseService,
    public util: Util) {
      
  }

  ngOnInit() {
  }


  begin(){
    this.router.navigate(['user']);
  }

  login(){
    this.router.navigate(['login']);
  }
  
  showAlert(header, message) {
    const alert: any = this.alertController.create({
        header: header,
        message: message,
        buttons: ['OK']
    });

    alert.then((_alert: any)=> {
        _alert.present();
    })
  }
}
