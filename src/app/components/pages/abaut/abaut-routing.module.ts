import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbautComponent } from './abaut.component';

const routes: Routes = [{ path: '', component: AbautComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbautRoutingModule { }
