import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LoadingController, AlertController, AngularDelegate } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { RegisterService } from '../../services/api/register.service';
import { Util } from '../../commons/util';
import { DatabaseService } from "../../services/database/database.service";
import { formatDate } from '@angular/common';
// import { LocalcadastroService, cadastro } from '../../services/database/localcadastro.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  idUsuario: number;
  image: string;
  loading: any;

  private sub: any;

  phone: string;
  dataNacimento: string;
  diaAcolhida: string;
  semanaEscala: string;

  cadastroForm: FormGroup;
  telefone:string='';
  data_nacimento:string='';
  dia_acolhida:string='';
  semana_escala:string='';

  dia_: any[] = [
    {
      opcao: 'quinta  20h'
    },
    {
      opcao: 'sabado  16h'
    },
    {
      opcao: 'domingo 09h'
    },
    {
      opcao: 'domingo 11h'      
    },
    {
      opcao: 'domingo 19:30h'
    }
  ];

  semana_: any[] = [
    {
      opcao: 'primeira'
    },
    {
      opcao: 'segunda'
    },
    {
      opcao: 'terceira'
    },
    {
      opcao: 'quarta'
    },
    {
      opcao: 'quinta'
    }
  ];

  allInstitutions: any;
  allBazares: any;
  customTextMenu: any;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public registerAPI: RegisterService,
    public dataBase :DatabaseService,
    public util: Util ) {

      this.image = "./../../../assets/img/user.svg";

      this.cadastroForm = this.formBuilder.group({
        telefone : ['', [Validators.required] ],
        data_nacimento : ['', Validators.required],
        dia_acolhida : ['', Validators.required],
        semana_escala : ['', Validators.required]
      });

      //this.cadastroForm.valueChanges.subscribe(data=>this.cadastroOnDataChange(data));
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.idUsuario = +params['id'];
     });
     console.log('id: ', this.idUsuario);
   }

   ngOnDestroy() {
     this.sub.unsubscribe();
   }

  cadastroOnDataChange(data): void {
     console.log(data);
  }

  logForm(){
    console.log("telefone: ", this.cadastroForm.value.telefone, "Data Nacimento: ", this.cadastroForm.value.data_nacimento);

    this.setTelefone(this.cadastroForm.value.telefone);
    this.setDataNacimento(this.cadastroForm.value.data_nacimento);
    this.setDiaAcolhida(this.cadastroForm.value.dia_acolhida);
    this.setSemanaEscala(this.cadastroForm.value.semana_escala);

    // Platform, UUID, pushReceiverId
    this.util.getInfo();
    if ( this.util.getPushToken() !== '' ){
      this.presentAlertConfirm('Atenção!', 'Por favor, confirme o telefine <strong>'+this.cadastroForm.value.telefone+'</strong>');
    }
  }

  saveData() {
    this.registerAPI.updateUser(this.idUsuario, this.getTelefone(), this.getDataNacimento().substr(0,10),
      this.getDiaAcolhida(), this.getSemanaEscala())
      .subscribe(res => {
        console.log(res);
        if ( parseInt(res.codigo) === 0 ){
          console.log('id: ', res.idUsuario);
          this.dataBase.setKeyValue('NSL',res.dadosUsuario);
          this.router.navigate(['home']);
        } else {
          this.showAlert('Atenção', res.mensagem[0].texto);
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

  formatarCelular(){
    var cel = this.cadastroForm.value.telefone;
    if ( this.cadastroForm.value.telefone !== undefined ){
      cel = cel.toString().replace(/\D/g,'');
    }
    this.cadastroForm.value.telefone = cel;
  }

  public getTelefone(){
    return this.phone;
  }

  public setTelefone(telefone){
    this.phone = telefone;
  }

  public getDataNacimento(){
    return this.dataNacimento;
  }

  public setDataNacimento(data_nacimento){
    this.dataNacimento = data_nacimento;
  }

  public getDiaAcolhida(){
    return this.diaAcolhida;
  }

  public setDiaAcolhida(dia_acolhida){
    this.diaAcolhida = dia_acolhida;
  }

  public getSemanaEscala(){
    return this.semanaEscala;
  }

  public setSemanaEscala(semana_escala){
    this.semanaEscala = semana_escala;
  }
}
