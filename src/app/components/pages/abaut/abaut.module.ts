import { MaterialModule } from './../../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbautRoutingModule } from './abaut-routing.module';
import { AbautComponent } from './abaut.component';


@NgModule({
  declarations: [AbautComponent],
  imports: [
    CommonModule,
    AbautRoutingModule,
    MaterialModule
  ]
})
export class AbautModule { }
