import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalhe-instituicao',
  templateUrl: './detalhe-instituicao.page.html',
  styleUrls: ['./detalhe-instituicao.page.scss'],
})
export class DetalheInstituicaoPage implements OnInit {

  nome: string;
  descricao: string;
  endereco: string;
  telefone: string;

  public instituicao: any;

  private sub: any;
  image: string;
  customActionSheetOptions: any;

  detalheInstituicaoForm: FormGroup;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder) { 

    this.customActionSheetOptions = {
      header: 'Instituições Parceiras',
      subHeader: 'Selecione a sua principal',
    };

    this.detalheInstituicaoForm = this.formBuilder.group({
      opt_detalheInstituicao : ['', Validators.compose([Validators.required]) ]
    });

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.nome = params['nome'],
       this.descricao = params['descricao'];
       this.endereco = params['endereco'];
       this.telefone = params['telefone'];
     });
     
     console.log("Nome      :"+this.nome);
     console.log("Descricao :"+this.descricao);
     console.log("Endereco  :"+this.endereco);
     console.log("Telefone  :"+this.telefone);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  back(){
    this.router.navigate(['institution']);
  }

  public getNome(){
    return this.nome;
  }

  public setNome(nome){
    this.nome = nome;
  }

  public getDescricao(){
    return this.descricao;
  }

  public setDescricao(descricao){
    this.descricao = descricao;
  }

  public getEndereco(){
    return this.endereco;
  }

  public setEndereco(endereco){
    this.endereco = endereco;
  }

  public getTelefone(){
    return this.telefone;
  }

  public setTelefone(telefone){
    this.telefone = telefone;
  }
}
