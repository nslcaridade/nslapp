import { NgModule /*, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA*/ } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CadastroPage } from './cadastro.page';
import { RegisterService } from '../../services/api/register.service';
import { Util } from '../../commons/util';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: CadastroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroPage],
  providers: [
    RegisterService,
    Util
  ]
  /*schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
  ]*/
})
export class CadastroPageModule {}
