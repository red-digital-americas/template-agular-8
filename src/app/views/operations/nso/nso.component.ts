import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-nso',
  templateUrl: './nso.component.html',
  styleUrls: ['./nso.component.css']
})
export class NsoComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  search_profile() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '700px',
      disableClose: true,
      data: { titulo: "Search Assignee", response: "", tipo: 2 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    });
  }
}

