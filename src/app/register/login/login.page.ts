import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { RegisterService } from '../../services/api/register.service';
import { DatabaseService } from "../../services/database/database.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: any;

  loginForm: FormGroup;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dataBase :DatabaseService,
    public registerAPI: RegisterService) {

      this.loginForm = this.formBuilder.group({
        email : ['', Validators.compose([Validators.required]) ]
      });
     }

  ngOnInit() {
  }

  localizaUsuario(): void {
    this.registerAPI.findUser(this.loginForm.value.email)    
      .subscribe( (res: any) => {
        if ( parseInt(res.codigo) === 0 ){
        console.log("antes do findUser");
        this.user = JSON.parse(JSON.stringify(res.dadosUsuario));
        console.log("pos do findUser");
        console.log("gravando no store");
        this.dataBase.removeKey('NSL');
        this.dataBase.setKeyValue('NSL',res.dadosUsuario);
        console.log(res.dadosUsuario);
        this.router.navigate(['home']);
        } else {
          this.showAlert('Atenção', res.mensagem.texto);
        }
      }, err => {
        console.log(err);
        this.router.navigate(['']);
      });
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
