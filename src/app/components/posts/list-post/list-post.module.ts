import { TableComponent } from './../../../shared/components/table/table.component';
import { MaterialModule } from './../../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPostRoutingModule } from './list-post-routing.module';
import { ListPostComponent } from './list-post.component';


@NgModule({
  declarations: [
    ListPostComponent,
    TableComponent],
  imports: [
    CommonModule,
    ListPostRoutingModule,
    MaterialModule,
  ]
})
export class ListPostModule { }
