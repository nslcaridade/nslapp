import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { RegisterService } from '../../services/api/register.service';
import { Util } from '../../commons/util';
import { FCM } from '@ionic-native/fcm/ngx';
import { Device } from "@ionic-native/device/ngx";
// import { LocaluserService, User } from '../../services/database/localuser.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  image: string;
  loading: any;

  name: string;
  email: string;

  userForm: FormGroup;
  user_name:string='';
  user_email:string='';
  token: string ='';
  

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public registerAPI: RegisterService,
    public util: Util,
    public fcm: FCM,
    public platform: Platform,
    public device: Device
   /*public localUserStorage: LocaluserService*/ ) {

      this.userForm = this.formBuilder.group({
        user_name : ['', Validators.compose([Validators.required, Validators.minLength(3)]) ],
        user_email : ['', Validators.required]
      });
   }

  ngOnInit() {
    this.getRefreshPushToken();
  }

  userOnDataChange(data: any): void {
     console.log(data);
  }

  logForm(){
    console.log("email: ", this.userForm.value.user_email, "nome: ", this.userForm.value.user_name, "token:" ,this.token);

    this.setName(this.userForm.value.user_name);
    this.setEmail(this.userForm.value.user_email);
    this.util.getInfo();
    if ( this.token !== '' ){
      this.presentAlertConfirm('Atenção!', 'Por favor, confirme o endereço de email <strong>'+this.getEmail()+'</strong>');
    } else {
      this.showAlert('Error','Push não esta presente.');
    }
  }

  saveData() {
    this.registerAPI.addUser(this.getEmail(), this.getName(),
      this.checkPlatform(), this.device.uuid, this.token )
      .subscribe(res => {
        if ( parseInt(res.codigo) === 0 ){
          // TODO: STORAGE
          this.router.navigate(['cadastro', {id: res.idUsuario}] );
        } else if (parseInt(res.codigo) === -1 ){
          console.log(res);
          this.showAlert('Error',res.mensagem[0].texto);

          this.router.navigate(['start']);
        }
      }, err => {
        console.log(err);
        this.showAlert('Error','ERRO Não conhecido ao add usuario favor informar o Alexandre');
        this.router.navigate(['']);
      });
  }

  getRefreshPushToken() {
		// console.log('[Credential] getRefreshPushToken In ');

		this.fcm
			.getToken()
			.then(token => {
				console.log("[PUSH] getToken Solicita novo Token: ", token);
				this.token = token;
				this.util.setPushToken(token);
			})
			.catch(error => {
				console.log("[PUSH] Exception: ", error);
			});
		// console.log('[Credential] getToken after : ', this.token);
		this.fcm.onTokenRefresh().subscribe(
			token => {
				console.log("[PUSH] onTokenRefresh Token:", token);
				this.token = token;
				console.log("[Credential] Token:", this.token);
				this.util.setPushToken(token);
			},
			err => {
				console.error("[PUSH] Exception:", err);
			}
    );
    // console.log('[Credential] onTokenRefresh after: ', this.token);

		if (this.token && this.token.length >= 1) {
			console.log("[Credential] Empty Token -> getToken()");
			this.fcm
				.getToken()
				.then(token => {
					console.log("[PUSH] getToken Solicita novo Token: ", token);
					this.token = token;
					this.util.setPushToken(token);
				})
				.catch(error => {
					console.log("[PUSH] Exception: ", error);
				});
		}
		// console.log('[Credential] getRefreshPushToken Leave: ', this.token);
  }
  
  public checkPlatform(): string {
		if (this.platform.is("android")) {
			//this.showAlert('Platform','android');
			return "android";
		} else if (this.platform.is("ios")) {
			//this.showAlert('Platform','ios');
			return "ios";
		} else if (this.platform.is("iphone")) {
			//this.showAlert('Platform','iphone');
			return "iphone";
		} else if (this.platform.is("mobile")) {
			//this.showAlert('Platform','mobile');
			return "mobile";
		} else if (this.platform.is("cordova")) {
			//this.showAlert('Platform','cordova');
			return "cordova";
		} else if (this.platform.is("hybrid")) {
			//this.showAlert('Platform','hybrid');
			return "hybrid;";
		} else if (this.platform.is("pwa")) {
			//this.showAlert('Platform','pwa');
			return "pwa";
		}
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

  async presentAlertConfirm(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancela, editar o e-mail ', blah);
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirmou email');
            this.saveData();
          }
        }
      ]
    });

    await alert.present();
  }

  presentLoading() {
    this.loading = this.loadingController.create({
      message: 'Carregando...'
    });

    this.loading.present();
  }

  public getName(){
    return this.name;
  }

  public setName(name){
    this.name = name;
  }

  public getEmail(){
    return this.email;
  }

  public setEmail(email){
    this.email = email;
  }

}
