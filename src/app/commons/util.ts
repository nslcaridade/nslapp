import { Injectable } from "@angular/core";
import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';

@Injectable({
  providedIn: 'root'
})
export class Util {

  pltfrm:String = 'android';
  uuid: String = 'dfadfa';
  pushToken: String = '1212';

  constructor(
    private platform: Platform,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private device: Device/*,
    private firebase: Firebase */) {

    //this.getInfo();
  }

  getInfo() {
    this.setPlatform();
    this.setDevice(this.device.uuid);
    this.onFirebaseRegisterDevice();
  }

  public onFirebaseRegisterDevice() {
    /*this.firebase.getToken()
      .then(token => this.setPushToken(token)
        // this.showAlert('getToken',this.getPushToken());
      ).catch(err=> console.log(err));*/
  }

  public onFirebaseTokenRefresh(){
    /*this.firebase.onTokenRefresh()
      .subscribe( (token: string) => this.setPushToken(token)
        // console.log(`Got a new token ${this.getPushToken()}`);
      );*/
  }

  public onFirebaseNotificationOpen(){
    /*this.firebase.onNotificationOpen().subscribe(data=>{
      this.showAlert('onNotificationOpen',data);
      console.log(data.name);
    }, err=> console.log(err));*/
  }

  public setPlatform() {
    if (this.platform.is('android')) {
      //this.showAlert('Platform','android');
      this.pltfrm = 'android';
    } else if (this.platform.is('ios')) {
      //this.showAlert('Platform','ios');
      this.pltfrm = 'ios';
    } else if (this.platform.is('iphone')) {
      //this.showAlert('Platform','iphone');
      this.pltfrm = 'iphone';
    } else if (this.platform.is('mobile')) {
      //this.showAlert('Platform','mobile');
      this.pltfrm = 'mobile';
    } else if (this.platform.is('cordova')) {
      //this.showAlert('Platform','cordova');
      this.pltfrm = 'cordova';
    } else if (this.platform.is('hybrid')) {
      //this.showAlert('Platform','hybrid');
      this.pltfrm = 'hybrid;'
    } else if (this.platform.is('pwa')) {
      //this.showAlert('Platform','pwa');
      this.pltfrm = 'pwa';
    }
  }

  public getPlatform(){
    return this.pltfrm;
  }

  public setDevice(uuid){
    this.uuid = uuid;
  }

  public getDevice() {
    return this.uuid;
  }

  public setPushToken(token){
    this.pushToken = token;
  }

  public getPushToken() {
    return this.pushToken;
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Carregando',
      duration: 2000,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
}
