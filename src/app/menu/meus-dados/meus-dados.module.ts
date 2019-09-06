import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterService } from '../../services/api/register.service';
import { MeusDadosPage } from './meus-dados.page';

const routes: Routes = [
  {
    path: '',
    component: MeusDadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeusDadosPage],
  providers: [RegisterService]
})
export class MeusDadosPageModule {}
