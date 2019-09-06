import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { DoacaoService } from '../services/api/doacao.service';
import { InstitutionService } from '../services/api/institution.service';

@Component({
  selector: 'app-doacao',
  templateUrl: './doacao.page.html',
  styleUrls: ['./doacao.page.scss'],
})
export class DoacaoPage implements OnInit {

  codInstituicao: number;
  startDate: string;
  endDate: string;

  nome: string;

  private sub: any;
  image: string;
  customActionSheetOptions: any;



  public alldoacoess: any;
  public allInstitutions: any;

  doacaoForm: FormGroup;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public doacaoAPI: DoacaoService,
    public institutionAPI: InstitutionService) {

      console.log('Passo 1');
      this.image = "./../../../assets/img/piggy-bank.svg";

      this.customActionSheetOptions = {
        header: 'Instituições Parceiras',
        subHeader: 'Selecione a sua principal',
      };

      // API GET
      this.institutionList();

      this.doacaoForm = this.formBuilder.group({
        opt_doacao : ['', Validators.compose([Validators.required]) ]
      });
      //this.doacaoForm.valueChanges.subscribe(data=>this.doacaoOnDataChange(data));
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.codInstituicao = +params['codInstituicao'];
     });
     console.log('codInstituicao: ', this.codInstituicao);
  }

  doacaoOnDataChange(data: any): void {
     console.log(data);
  }

  institutionList(): void {
    this.nome='nome';
    this.institutionAPI.getAllInstitutions()
      .subscribe( (data: any) => {
        this.allInstitutions = JSON.parse(JSON.stringify(data.listaInstituicao));
        console.log(data.listaInstituicao);
      }, err => {
        console.log(err);

      });
  }

  logForm(){
    this.backMenu();
  }

  getData() {
    this.doacaoAPI.getDoacoesPorPeriodo(this.codInstituicao, this.getStartDate(), this.getEndDate())
      .subscribe(res => {
        // this.response = res;
        console.log(res);
        if ( parseInt(res.codigo) === 0 ) {
            // TODO: Ir para TELA DE STATUS
            this.router.navigate(['']);
        } else {
          this.showAlert('Atenção', res.mensagem);
        }

      }, err => {
        console.log(err);
        this.router.navigate(['']);
      });
  }

  backMenu(){
    this.router.navigate(['relatorioDoacoes']);
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
            console.log('Cancela, editar o banco ', blah);
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirmou o banco');
            this.getData();
          }
        }
      ]
    });

    await alert.present();
  }

  public getStartDate(){
    return this.startDate;
  }

  public setStartDate(startDate){
    this.startDate = startDate;
  }

  public getEndDate(){
    return this.endDate;
  }

  public setEndDate(endDate){
    this.endDate = endDate;
  }

}
