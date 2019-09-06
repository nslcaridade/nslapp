import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { InstitutionService } from '../../services/api/institution.service';
import { RegisterService } from '../../services/api/register.service';
import { DatabaseService } from "../../services/database/database.service";
import { headersToString } from 'selenium-webdriver/http';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.page.html',
  styleUrls: ['./institution.page.scss'],
})
export class InstitutionPage implements OnInit {

  id: number;
  nome: string;
  telefone: string;
  endereco: string;
  dataFundacao: string;
  paroquea: string;
  telefoneParoquea: string;
  ativo: boolean;
  descricao: string;

  private sub: any;
  image: string;
  customActionSheetOptions: any;



  public allInstitutions: any;

  institutionForm: FormGroup;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public InstitutionAPI: InstitutionService,
    public dataBase :DatabaseService,
    public registerAPI: RegisterService) {

      console.log('Passo 1');
      this.image = "./../../../assets/img/piggy-bank.svg";

      this.customActionSheetOptions = {
        header: 'Instituições Parceiras',
        subHeader: 'Selecione a sua principal',
      };

      // API GET
      this.carregaMemoria();
      //this.institutionList();

      this.institutionForm = this.formBuilder.group({
        opt_institution : ['', Validators.compose([Validators.required]) ]
      });
      //this.institutionForm.valueChanges.subscribe(data=>this.institutionOnDataChange(data));
  }

  ngOnInit() {

  }

  institutionOnDataChange(data: any): void {
     console.log(data);
  }

  carregaMemoria(){

    console.log("localizando no store");
    this.dataBase.getValue('INST').then(
      data => {
      if ( data !== null ){
       this.allInstitutions = JSON.parse(JSON.stringify(data));
      }});
    }

  institutionList(): void {
    this.InstitutionAPI.getAllInstitutions()    
      .subscribe( (instit: any) => {
        console.log("antes do getinst");
        this.allInstitutions = JSON.parse(JSON.stringify(instit.listaInstituicao));
        console.log("pos do getinst");
        console.log("localizando no store");
        this.dataBase.removeKey('INST');
        this.dataBase.setKeyValue('INST',this.allInstitutions);
        console.log(instit.listaInstituicao);
      }, err => {
        
      });
  }

  logForm(){
    this.backMenu();
  }

  saveData() {
    this.registerAPI.updateUserInstitution(this.id, this.getNome())
      .subscribe(res => {
        // this.response = res;
        console.log(res);
        if ( parseInt(res.codigo) === 0 ) {
            // TODO: Ir para TELA DE STATUS
            this.router.navigate(['menu']);
        } else {
          this.showAlert('Atenção', res.mensagem.texto);
        }

      }, err => {
        console.log(err);
        this.router.navigate(['']);
      });
  }

  backMenu(){
    this.router.navigate(['menu']);
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

  showDetalhe(nome, descricao, endereco, telefone) {
    this.router.navigate(['detalhe-instituicao', 
                         {nome: nome,
                          descricao: descricao,
                          endereco: endereco,
                          telefone: telefone}] );
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
            this.saveData();
          }
        }
      ]
    });

    await alert.present();
  }

  public getId(){
    return this.id;
  }

  public setId(code){
    this.id = code;
  }

  public getNome(){
    return this.nome;
  }

  public setNome(nome){
    this.nome = 'nome';
  }

  public getTelefone(){
    return this.telefone;
  }

  public setTelefone(telefone){
    this.telefone = telefone;
  }

  public getEndereco(){
    return this.endereco;
  }

  public setEndereco(endereco){
    this.endereco = endereco;
  }

  public getDataFundacao(){
    return this.dataFundacao;
  }

  public setDataFundacao(dataFundacao){
    this.dataFundacao = dataFundacao;
  }

  public getParoquea(){
    return this.paroquea;
  }

  public setParoquea(paroquea){
    this.paroquea = paroquea;
  }

  public getTelefoneParoquea(){
    return this.telefoneParoquea;
  }

  public setTelefoneParoquea(telefoneParoquea){
    this.telefoneParoquea = telefoneParoquea;
  }

  public getAtivo(){
    return this.ativo;
  }

  public setAtivo(ativo){
    this.ativo = ativo;
  }

  public getDescricao(){
    return this.descricao;
  }

  public setDescricao(descricao){
    this.descricao = descricao;
  }

}
