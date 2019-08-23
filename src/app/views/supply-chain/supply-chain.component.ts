import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-supply-chain',
  templateUrl: './supply-chain.component.html',
  styleUrls: ['./supply-chain.component.css']
})
export class SupplyChainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  open() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '700px',
      disableClose: true,
      data: { titulo: "Prueba", response: "", tipo: 2 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
     
    });
  }
}
