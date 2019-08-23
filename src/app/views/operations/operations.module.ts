import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsoComponent } from '../operations/nso/nso.component';

import { OperationsRoutingModule } from '../operations/operations-routing.module';

// ngModel directive
import { FormsModule } from '@angular/forms';

// materia
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    OperationsRoutingModule,
    CommonModule, 
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  declarations: [
    NsoComponent
  ]
})

export class OperationsModule { }
