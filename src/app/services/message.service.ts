import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    config = new MatSnackBarConfig();

    constructor(public snackBar: MatSnackBar) {
      this.config.duration = 5000;
      this.config.verticalPosition = 'bottom';
      this.config.horizontalPosition = 'right';
    }

    messageSuccess(message: string) {
        this.config.panelClass = 'snackbar-success';
        this.snackBar.open(message, null, this.config);
    }

    messageError(message: string) {
        this.config.panelClass = 'snackbar-error';
        this.snackBar.open(message, null, this.config);
    }

}
