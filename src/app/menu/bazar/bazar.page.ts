import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { BazarService } from '../../services/api/bazar.service';
import { RegisterService } from '../../services/api/register.service';
import { DatabaseService } from "../../services/database/database.service";

@Component({
  selector: 'app-bazar',
  templateUrl: './bazar.page.html',
  styleUrls: ['./bazar.page.scss'],
})
export class BazarPage implements OnInit {

  public allBazares: any;

  bazarForm: FormGroup;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public BazarAPI: BazarService,
    public dataBase :DatabaseService,
    public registerAPI: RegisterService) {

      this.carregaMemoria();
      //this.bazarList();

      this.bazarForm = this.formBuilder.group({
        opt_bazar : ['', Validators.compose([Validators.required]) ]
      });

   }

  ngOnInit() {
  }

  carregaMemoria(){

    console.log("localizando no store");
    this.dataBase.getValue('BAZ').then(
      data => {
      if ( data !== null ){
       this.allBazares = JSON.parse(JSON.stringify(data));
      }});
    }

  bazarList(): void {
    this.BazarAPI.getAllBazares()
      .subscribe( (bazar: any) => {
        console.log("antes do getinst");
        this.allBazares = JSON.parse(JSON.stringify(bazar.ltBazar));
        console.log("pos do getinst");
        console.log("localizando no store");
        this.dataBase.removeKey('BAZ');
        this.dataBase.setKeyValue('BAZ',this.allBazares);
        console.log(bazar);
      }, err => {
        
      });
    }

  backMenu(){
    this.router.navigate(['menu']);
  }

}
