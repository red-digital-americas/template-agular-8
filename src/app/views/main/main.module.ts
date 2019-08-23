import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MainRoutingModule } from './main-routing.module';

// materia
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    MainRoutingModule,
    CommonModule,
    MatInputModule
  ],
  declarations: [
    MainComponent,
  ]
})

export class MainModule { }
