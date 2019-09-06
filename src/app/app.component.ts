import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { StartPage } from './register/start/start.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  rootPage: any = null;
  tableinited;

  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private device: Device,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private fcm: FCM) {

    this.initializeApp();
  }

  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = StartPage;
    console.log('por aqui');
  }

  initializeApp() {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      document.addEventListener(
          "backbutton",
          function(event) {
              event.preventDefault();
              event.stopPropagation();
              console.log("[initializeApp] disable hwd back btn");
          },
          false
      );
      this.getPushToken();
  });
   /* this.platform.ready().then(() => {
      this.firebase.getToken().then(
        ).catch(err=> console.log(err));

      this.firebase.onNotificationOpen().subscribe(data=>{
      }, err=> console.log(err));
      this.statusBar.styleDefault();
      this.openHomePage(this.splashScreen);

    });*/
  }

  getPushToken() {
		this.fcm
			.getToken()
			.then(token => {
				// backend.registerToken(token);
				console.log("[PUSH] TOKEN: ", token);
			})
			.catch(error => {
				console.log("[PUSH] Exception: ", error);
			});

		this.fcm.onNotification().subscribe(
			data => {
				// console.log("[onNotification] data: ", JSON.stringify(data));
				/* data -> wasTapped, foreground, title, body, page, id */
				if (data.wasTapped) {
					console.log("[PUSH] Received in background");
					/*if (Object.keys(data).length > 4) {
						this.router.navigate([data.page, data.id]);
					}*/
				} else {
					console.log(
						"[PUSH] Received in foreground: ",
						JSON.stringify(data)
					);
					//this.showAlert(data.title, data.body);

					//if (Object.keys(data).length > 4) {
						/* Erro de navegacao quando esta tentando ir pra pagina que o app ja esta
			   			   this.router.navigate([data.page, data.id]); */
						// this.ngZone.run(() => this.router.navigate([data.page, data.id]).then() );
						/*this.ngZone.runOutsideAngular(() => {
							this.ngZone.run(() => {
								/*
									my = score
									my/manager = Compartilhamento
									request/view/{partnerId} = Pedir MAX
								 *//*
								this.router
									.navigate(['/', 'score', data.id, data.page])
									.then();
							});
						});
          }*/
					/* Funciona
          const toast = this.toastCtrl.create({
            message: data.body,
            duration: 3000
          });
          toast.then((_toast: any) => {
            _toast.present();
          });*/
				}
			},
			err => {
				console.error("[PUSH] Exception:", err);
			}
		);
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
