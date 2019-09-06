import { NgModule /*, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA*/ } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserPage } from './user.page';
import { RegisterService } from '../../services/api/register.service';
import { Util } from '../../commons/util';

const routes: Routes = [
  {
    path: '',
    component: UserPage
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
  declarations: [UserPage],
  providers: [
    RegisterService,
    Util
  ]
  /*schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
  ]*/
})
export class UserPageModule {}
