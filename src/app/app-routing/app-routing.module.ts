import { StarterComponent } from './../layout/starter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../views/login/login.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        component: StarterComponent,
        children: [
          {
            path: 'main',
            loadChildren: '../views/main/main.module#MainModule'
          },
          {
            path: 'supply-chain',
            loadChildren: '../views/supply-chain/supply-chain.module#SupplyChainModule'
          },
          {
            path: 'coordinator-profile',
            loadChildren: '../views/coordinator-profile/coordinator-profile.module#CoordinatorProfileModule'
          },
          {
            path: 'operations',
            loadChildren: '../views/operations/operations.module#OperationsModule'
          }
        ]
      }
    ])
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
