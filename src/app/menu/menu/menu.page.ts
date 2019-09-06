
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from "../../services/database/database.service";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit{

  idUsuario: number;
  private sub: any;

  image: string;
  menuForm: FormGroup;

  customTextMenu: any;
  mensagem:string='';

  allInstitutions: any;
  allBazares: any;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dataBase: DatabaseService,
    private platform: Platform) {

    console.log('Passo 1');
    this.image = "../../assets/img/pier_giorgio.jpg";

    // API GET
    this.carregaMemoria();

    this.menuForm = this.formBuilder.group({
      opt_menu : ['', Validators.compose([Validators.required]) ]
    });
    //this.institutionForm.valueChanges.subscribe(data=>this.institutionOnDataChange(data));
  }

  carregaMemoria(){

    console.log("localizando no store");
    this.dataBase.getValue('MSG').then(
      data => {
        console.log(data);
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if ( data !== null  && element.tipo === 'menu'){
          this.customTextMenu = JSON.parse(JSON.stringify(element.texto));
          console.log("DEBUG - mensagem:"+element);
         }}
      }
      );  
      
    }

    meusDados(){
      this.router.navigate(['meus-dados']);
    }
    instutitions(){
      this.router.navigate(['institution']);
    }
    relatorioDoacoes(){
      this.router.navigate(['relatorio-doacao']);
    }
    diretrizes(){
      this.router.navigate(['diretrizes']);
    }
    calendario(){
      this.router.navigate(['calendario']);
    }
    videos(){
      this.router.navigate(['videos']);
    }
    tutorial(){
      this.router.navigate(['tutorial']);
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.idUsuario = +params['id'];
     });
     console.log('id: ', this.idUsuario);
   }

   exitApp(){
    this.platform.pause;
  }
}
