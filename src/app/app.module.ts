import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StarterComponent } from './layout/starter.component';
import { StarterHeaderComponent } from './layout/starter-header/starter-header.component';
import { StarterLeftSideComponent } from './layout/starter-left-side/starter-left-side.component';
import { StarterContentComponent } from './layout/starter-content/starter-content.component';
import { StarterFooterComponent } from './layout/starter-footer/starter-footer.component';
import { StarterControlSidebarComponent } from './layout/starter-control-sidebar/starter-control-sidebar.component';
// ngModel directive
import { FormsModule } from '@angular/forms';

//Loading
import { NgxLoadingModule } from 'ngx-loading';

// materia
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatSortModule, MatPaginatorModule, MatTableModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Datepicker
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

/*Components*/
import { DialogComponent } from './components/dialog/dialog.component';

/*Servicios*/
import { GeneralService } from '../app/services/general.service';
import { MessageService } from '../app/services/message.service';

/*views*/
import { LoginComponent } from './views/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    StarterComponent,
    StarterHeaderComponent,
    StarterLeftSideComponent,
    StarterContentComponent,
    StarterFooterComponent,
    StarterControlSidebarComponent,
    LoginComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxLoadingModule.forRoot({})
  ],
  entryComponents: [DialogComponent],
  providers: [GeneralService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
