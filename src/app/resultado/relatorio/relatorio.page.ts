import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';

import { DoacaoService } from '../../services/api/doacao.service';
import { RegisterService } from '../../services/api/register.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})
export class RelatorioPage implements OnInit {

  nome: string;
  pesoTotal: number;
  quanTotal: number;

  private sub: any;
  image: string;
  customActionSheetOptions: any;

  cod_intitution: number;
  start_date: string;
  end_date: string;

  public allDoacoes: any;

  isValidFormSubmitted = null;

  relatorioForm: FormGroup;
  codInstituicao:string='';

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    //private formBuilder: FormBuilder,
    public doacaoApi: DoacaoService) {

      console.log('Passo 1');
      this.image = "./../../../assets/img/piggy-bank.svg";

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.cod_intitution = +params['codInstituicao'];
       this.start_date = params['startDate'];
       this.end_date = params['endDate'];
       this.nome = params['nome'];
     });

     this.listaDoacoes();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  listaDoacoes(): void {
    console.log('DEBUG - cod_intitution: ', this.cod_intitution);
    this.doacaoApi.getDoacoesPorPeriodo(this.cod_intitution, this.start_date, this.end_date)
      .subscribe( (data: any) => {
        this.allDoacoes = JSON.parse(JSON.stringify(data.relatorioDoacao));
        this.somatoria();
      }, err => {
        console.log(err);

      });
  }

  somatoria(){
    this.quanTotal = 0;
    this.pesoTotal = 0;
    for (let index = 0; index < this.allDoacoes.length; index++) {
      const element = this.allDoacoes[index];
      this.quanTotal = this.quanTotal + element[2];
      this.pesoTotal = this.pesoTotal + element[3];
    }
    if ( this.pesoTotal > 0 ){
      this.pesoTotal = this.pesoTotal / 100;
    }
  }



  logForm(){
    this.backMenu();
  }

  backMenu(){
    this.router.navigate(['menu']);
  }

}
