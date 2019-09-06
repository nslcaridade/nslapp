import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InstitutionPage } from './institution.page';
import { InstitutionService } from '../../services/api/institution.service';
import { RegisterService } from '../../services/api/register.service';

const routes: Routes = [
  {
    path: '',
    component: InstitutionPage
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
  declarations: [InstitutionPage],
  providers: [
    InstitutionService,
    RegisterService
  ]
})
export class InstitutionPageModule {}
