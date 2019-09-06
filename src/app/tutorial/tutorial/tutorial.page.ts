import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from "../../services/database/database.service";
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  @ViewChild("slidesTour", {static: true}) slides: IonSlides;

	slideOpts = {
		effect: "flip"
	};

  id: string;
  type: string;
  private sub: any;
  texto1: string;
  texto2: string;
  texto3: string;

  tutorialForm: FormGroup;
  
	constructor(
    public router: Router,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private dataBase: DatabaseService,
    public route: ActivatedRoute) {
      this.carregaMemoria();
      this.tutorialForm = this.formBuilder.group({
        opt_tutorial : ['', Validators.compose([Validators.required]) ]
      });
    }

	next() {
		this.slides.slideNext();
	}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       this.type = params['type'];
    });
    console.log('[Input] id: ', this.id);
    console.log('[Input] type: ', this.type);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadMessage() {

  }

  carregaMemoria(){

    console.log("localizando no store");
    this.dataBase.getValue('MSG').then(
      data => {
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if ( element !== null  && element.tipo === 'tur1'){
          this.texto1 = JSON.parse(JSON.stringify(element.texto));
         }
        else if ( element !== null  && element.tipo === 'tur2'){
          this.texto2 = JSON.parse(JSON.stringify(element.texto));
         }
        else if ( element !== null  && element.tipo === 'tur3'){
          this.texto3 = JSON.parse(JSON.stringify(element.texto));
         }
        }
      }
      );  
      
    }

  backMenu() {
    console.log('Fim do Tutorial -> Signing');
    this.router.navigate(['menu']);
  }
}

