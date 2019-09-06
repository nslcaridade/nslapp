import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/api/register.service';
import { DatabaseService } from "../../services/database/database.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { IonicModule, IonApp } from '@ionic/angular';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {

  dadosUser: any;
  idUsuario: number;
  nome: string;
  email: string;
  dia_acolhida: string;
  semana_escala: string;
  data_nascimento: string;
  telefone: string;
  plataforma: string;
  deficeToken: string;

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

  meusDadosPageForm: FormGroup;

  constructor(
    public registerApi: RegisterService,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dataBase :DatabaseService) {

      this.carregaMemoria();
      //this.findUser();

      this.meusDadosPageForm = this.formBuilder.group({
        cNome : ['', Validators.compose([Validators.required, Validators.minLength(3)]) ],
        cEmail : ['', Validators.required],
        cDiaAcolhida : ['', Validators.required],
        cSemanaEscala : ['', Validators.required]
      });

    }

  ngOnInit() {
  }

  carregaMemoria(){
    console.log("localizando no store");
    this.dataBase.getValue('NSL').then(
      data => {
      if ( data !== null ){
       this.dadosUser = JSON.parse(JSON.stringify(data));
       console.log(this.dadosUser);
       this.idUsuario = this.dadosUser.idUsuario;
       this.nome = this.dadosUser.nome;
       this.email = this.dadosUser.email;
       this.dia_acolhida = this.dadosUser.diaAcolhida;
       this.semana_escala = this.dadosUser.semanaEscala;
       this.telefone = this.dadosUser.telefone;
       this.data_nascimento = this.dadosUser.dataNacimento;
      }});
    }

  findUser(): void {

    this.dataBase.getValue('NSL')
    .then(
        data => {
        if ( data !== null ){
         this.idUsuario = JSON.parse(JSON.stringify(data.idUsuario));
        }
        this.registerApi.findUser(this.idUsuario)
          .subscribe( (userFound: any) => {
           console.log("passo:"+userFound);
            this.dadosUser = JSON.parse(JSON.stringify(userFound.dadosUsuario));
            this.idUsuario = this.dadosUser.idUsuario;
            this.nome = this.dadosUser.nome;
            this.email = this.dadosUser.email;
            this.dia_acolhida = this.dadosUser.diaAcolhida;
            this.semana_escala = this.dadosUser.semanaEscala;
            this.data_nascimento = this.dadosUser.dataNacimento;
            this.telefone = this.dadosUser.telefone;
            this.plataforma = this.dadosUser.plataforma;
            this.deficeToken = this.dadosUser.deficeToken;
            this.dataBase.removeKey('NSL');
            this.dataBase.setKeyValue('NSL',this.dadosUser);
            console.log("passo++");
            console.log(userFound.dadosUsuario);
          }, err => {
            console.log(err);
    
          });
      });
    }
  
  atualizaUser(): void {

    if ( this.meusDadosPageForm.value.cDiaAcolhida !== undefined &&
         this.meusDadosPageForm.value.cDiaAcolhida !== "" )
      this.setDiaAcolhida(this.meusDadosPageForm.value.cDiaAcolhida);
    if ( this.meusDadosPageForm.value.cSemanaEscala !== undefined &&
         this.meusDadosPageForm.value.cSemanaEscala !== "" )
      this.setSemanaEscala(this.meusDadosPageForm.value.cSemanaEscala);

    console.log("Atualiza: dia:"+this.getDiaAcolhida()+
                ", semana :"+this.getSemanaEscala()+
                ", telefone:"+this.telefone+
                ", data_nascimento:"+this.data_nascimento)
    this.registerApi.updateUser(this.idUsuario, this.telefone, this.data_nascimento,
      this.getDiaAcolhida(), this.getSemanaEscala())
      .subscribe(res => {
        console.log(res);
        if ( parseInt(res.codigo) === 0 ){
          console.log('id: ', res.idUsuario);
          this.dataBase.removeKey('NSL');
            this.dataBase.setKeyValue('NSL',this.dadosUser);

          this.router.navigate(['menu', {id: res.idUsuario}]);
        }
      }, err => {
        console.log(err);
        this.router.navigate(['']);
      });
  }

  removeUser(): void {
    this.dataBase.getValue('NSL')
    .then(
        data => {
        if ( data !== null ){
         this.idUsuario = JSON.parse(JSON.stringify(data.idUsuario));
         console.log("No delete "+this.idUsuario);
         this.registerApi.deleteUser(this.idUsuario).subscribe(
          res => {
            console.log(res);
            if ( parseInt(res.codigo) === 0 ){
              console.log('id: ', res.idUsuario);
              this.dataBase.removeKey('NSL');
              this.router.navigate(['start']);
            }
          }, err => {
            console.log(err);
            this.router.navigate(['']);
          });

        }
      });
  }

  backMenu(){
    this.router.navigate(['menu']);
  }

  public setNome(nome){
    this.nome = nome;
  }

  public getNome(){
    return this.nome;
  }

  public setEmail(email){
    this.email = email;
  }

  public getEmail(){
    return this.email;
  }

  public setDiaAcolhida(dia_acolhida){
    this.dia_acolhida = dia_acolhida;
  }

  public getDiaAcolhida(){
    return this.dia_acolhida;
  }

  public setSemanaEscala(semana_escala){
    this.semana_escala = semana_escala;
  }

  public getSemanaEscala(){
    return this.semana_escala;
  }

}
