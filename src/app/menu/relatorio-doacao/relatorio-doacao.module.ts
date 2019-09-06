import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InstitutionService } from '../../services/api/institution.service';

import { RelatorioDoacaoPage } from './relatorio-doacao.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioDoacaoPage
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
  declarations: [RelatorioDoacaoPage],
  providers: [InstitutionService]
})
export class RelatorioDoacaoPageModule {}
