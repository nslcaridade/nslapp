import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BazarService } from '../../services/api/bazar.service';
import { RegisterService } from '../../services/api/register.service';
import { BazarPage } from './bazar.page';

const routes: Routes = [
  {
    path: '',
    component: BazarPage
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
  declarations: [BazarPage],
  providers: [
    BazarService,
    RegisterService
  ]
})
export class BazarPageModule {}
