import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DetalheInstituicaoPage } from './detalhe-instituicao.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheInstituicaoPage
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
  declarations: [DetalheInstituicaoPage]
})
export class DetalheInstituicaoPageModule {}
