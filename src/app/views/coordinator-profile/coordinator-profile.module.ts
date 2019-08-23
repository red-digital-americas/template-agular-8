import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatorProfileComponent } from './coordinator-profile.component';
import { CoordinatorProfileRoutingModule } from './coordinator-profile-routing.module';

// ngModel directive
import { FormsModule } from '@angular/forms';

// Angular material
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule, MatSortModule, MatPaginatorModule,
  MatTableModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';

// Datepicker
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

// Chips
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// Iconos
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CoordinatorProfileRoutingModule,
    CommonModule,
    FormsModule, // Para que funcione ngModel
    MatInputModule, // Input
    MatGridListModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatDatepickerModule, // CValendario
    MatNativeDateModule,

    // Chips
    MatAutocompleteModule,
    MatChipsModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,

    // Snackbar
    MatSnackBarModule
  ],
  declarations: [
    CoordinatorProfileComponent
  ]
})

export class CoordinatorProfileModule { }
