import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoordinatorProfileComponent } from './coordinator-profile.component';

const routes: Routes = [
  {
    path: '',
    component: CoordinatorProfileComponent,
    data: {
      title: 'coordinator-profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class CoordinatorProfileRoutingModule { }
