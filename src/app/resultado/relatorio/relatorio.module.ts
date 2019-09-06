import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
//import { DoacaoService } from '../../services/api/doacao.service';

import { RelatorioPage } from './relatorio.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RelatorioPage/*,
    DoacaoService*/
  ]
})
export class RelatorioPageModule {}
