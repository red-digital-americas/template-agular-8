import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplyChainComponent } from './supply-chain.component';

import { SupplyChainRoutingModule } from './supply-chain-routing.module';

// ngModel directive
import { FormsModule } from '@angular/forms';

// materia
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    SupplyChainComponent
  ],
  imports: [
    SupplyChainRoutingModule,
    CommonModule,
    FormsModule,
    MatInputModule
  ]
})

export class SupplyChainModule { }
