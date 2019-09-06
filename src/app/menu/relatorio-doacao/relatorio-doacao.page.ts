import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { DatabaseService } from "../../services/database/database.service";

@Component({
  selector: 'app-relatorio-doacao',
  templateUrl: './relatorio-doacao.page.html',
  styleUrls: ['./relatorio-doacao.page.scss'],
})
export class RelatorioDoacaoPage implements OnInit {

  nome: string;

  private sub: any;
  image: string;
  customActionSheetOptions: any;

  cod_intitution: number;
  start_date: string='';
  end_date: string='';

  public allInstitutions: any;

  isValidFormSubmitted = null;

  relatorioDoacaoForm: FormGroup;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    public dataBase :DatabaseService,
    private formBuilder: FormBuilder) {

      this.carregaMemoria();

      this.relatorioDoacaoForm = this.formBuilder.group({
        codInstituicao : ['', Validators.compose([Validators.required]) ],
        startDate : ['', Validators.compose([Validators.required]) ],
        endDate : ['', Validators.compose([Validators.required]) ]
      });

      //this.relatorioDoacaoForm.valueChanges.subscribe(data=>this.institutionOnDataChange(data));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  

  carregaMemoria(){

    console.log("localizando no store");
    this.dataBase.getValue('INST').then(
      data => {
      if ( data !== null ){
       this.allInstitutions = JSON.parse(JSON.stringify(data));
      }});
    }

  logForm(){

    this.cod_intitution = this.relatorioDoacaoForm.value.codInstituicao;
    this.start_date = this.relatorioDoacaoForm.value.startDate;
    this.end_date = this.relatorioDoacaoForm.value.endDate;

    console.log(this.relatorioDoacaoForm.value.startDate);
    console.log(this.relatorioDoacaoForm.value.endDate);
    this.backMenu();
  }

  atualizaUser() {

    this.cod_intitution = this.relatorioDoacaoForm.value.codInstituicao;
    this.start_date = this.relatorioDoacaoForm.value.startDate;
    this.end_date = this.relatorioDoacaoForm.value.endDate;

    console.log(this.start_date);
    console.log(this.end_date);

     this.isValidFormSubmitted = false;
     if (this.relatorioDoacaoForm.invalid) {
       console.log('Formulario Invalido');
        return;
     }

     this.isValidFormSubmitted = true;
     console.log('relatorio-doacoa - get id');
     console.log(this.cod_intitution);
     this.router.navigate(['relatorio', {codInstituicao: this.cod_intitution, startDate: this.start_date.substr(0,10), endDate: this.end_date.substr(0,10)}]).then( (e) =>{
       if (e){
         console.log('Sucesso');
       } else {
         console.log('Nao foi dessa vez');
       }
     })
     .catch((error) => {
       console.log('Nao é por aqui: ', error);
     });

     this.relatorioDoacaoForm.reset();
  }

  backMenu(){
    this.router.navigate(['menu']);
  }

  public getEndDate(){
    return this.end_date;
  }

}
