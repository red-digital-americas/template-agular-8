import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NsoComponent } from '../operations/nso/nso.component';

const routes: Routes = [
  {
    path: 'nso',
    component: NsoComponent,
    data: {
      title: 'nso'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class OperationsRoutingModule { }
