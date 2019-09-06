import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { CalendarioService } from '../../services/api/calendario.service';
import { DatabaseService } from "../../services/database/database.service";
import { DetalheInstituicaoPage } from 'src/app/resultado/detalhe-instituicao/detalhe-instituicao.page';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  public allCalendario: any;

  calendarioForm: FormGroup;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private CalendarAPI: CalendarioService,
    public dataBase :DatabaseService) { 
      this.calendarioList();
      this.calendarioForm = this.formBuilder.group({
        opt_bazar : ['', Validators.compose([Validators.required]) ]
      });

    }

    ngOnInit() {
    }
  
    carregaMemoria(){
  
      console.log("localizando no store");
      this.dataBase.getValue('CAL').then(
        data => {
        if ( data !== null ){
         this.allCalendario = JSON.parse(JSON.stringify(data));
        }});
      }

      calendarioList(): void {
        this.CalendarAPI.getAllCalendar()
          .subscribe( (calendario: any) => {
            console.log("antes do getinst");
            this.allCalendario = JSON.parse(JSON.stringify(calendario.ltCalendario));
            console.log("pos do getinst");
            console.log("localizando no store");
            this.dataBase.removeKey('CAL');
            this.dataBase.setKeyValue('CAL',this.allCalendario);
            console.log("Calendario:"+JSON.stringify(calendario));
          }, err => {
          });
        }

      showDetalhe(detalhe){
        if ( detalhe.bazar != null ){
          console.log("Bazar:"+JSON.stringify(detalhe.bazar));
          this.router.navigate(['detalhe-bazar',{
                                  id: detalhe.bazar.id,
                                  valor: detalhe.bazar.valor,
                                  descricao: detalhe.bazar.descricao,
                                  data: detalhe.dataCalendario}] );
        } else if ( detalhe.bingo != null ){
          console.log("Bingo:"+JSON.stringify(detalhe.bingo));
          this.router.navigate(['bingo',{
                                 id: detalhe.bingo.id,
                                 valor: detalhe.bingo.valor,
                                 descricao: detalhe.bingo.descricao,
                                 data: detalhe.dataCalendario}] );
        } else if ( detalhe.festa != null ){
          console.log("Festa:"+JSON.stringify(detalhe.festa));
          this.router.navigate(['festa',{
                                 id: detalhe.festa.id,
                                 descricao: detalhe.festa.descricao,
                                 data: detalhe.dataCalendario}] );
        } else if ( detalhe.passeio != null ){
          console.log("Passeio:"+JSON.stringify(detalhe.passeio));
          this.router.navigate(['passeio',{
                                 id: detalhe.passeio.id,
                                 descricao: detalhe.passeio.descricao,
                                 data: detalhe.dataCalendario}] );
        }
      }
    
      backMenu(){
        this.router.navigate(['menu']);
      }

}
