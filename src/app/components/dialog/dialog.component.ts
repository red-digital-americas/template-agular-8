import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  // Modal - Emergency contact
  // Relations catalog
  relationsCatalog: any;
  relationSelected: number;
  // Add EmergencyContact
  fullName: string;
  email: string;
  contactNumber1: string;
  contactNumber2: string;
  UserId: number;

  // Modal - Document type
  // Document types catalog
  documentTypesCatalog: any;
  documentTypeSelected: number;
  // Add Document
  documentTypeName: string;
  expiredDate: any;
  documentFile: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: GeneralService
  ) { }

  ngOnInit() {
    // console.log('ngOnInit()');
    // console.log(this.data);

    // If dialog is 'emergencyContact', init relationsCatalog
    if (this.data.tipo === 'emergencyContact') {
      // console.log(`'this.data.titulo === 'emergencyContact'`);
      this.relationsCatalog = this.data.response;
    }

    // If dialog is 'document', init documenttypesCatalog
    if (this.data.tipo === 'document') {
      // console.log(`'this.data.titulo === 'document'`);
      this.documentTypesCatalog = this.data.response;
    }
  }

  addEmergencyContact() {
    // console.log('addEmergencyContact()');

    const userInfo = JSON.parse(localStorage.getItem('user'));

    // Parameters request
    const emergencyContact = {
      FullName: this.fullName,
      RelationId: this.relationSelected,
      ContactNumber1: this.contactNumber1,
      ContactNumber2: this.contactNumber2,
      UserId: userInfo.id
    };

    this.service
      .service_general_post('emergencycontact', emergencyContact)
      .subscribe(response => {
        // console.log('response', response);
        this.dialogRef.close(response);
      }
    );
  }

  addDocument() {
    // console.log('addDocument()');
    // console.log(this.documentName, this.expiredDate, this.documentFile);

    // Valid format to save in the data base
    const expiredDateUTC = this.expiredDate.toUTCString();
    const uploadDateUTC = new Date().toUTCString();

    const userInfo = JSON.parse(localStorage.getItem('user'));

    // Create a FormDataObject
    const formDataDocument = new FormData();

    // Uploaded -> 1, Approved -> 2, Expired -> 3
    const uploaded = '1'; // The initial state is 1

    // It's important that the information is valid to avoid a problem
    // with the CORS, it is possible to see the invalid field in the
    // browser console
    formDataDocument.append('DocumentTypeId', this.documentTypeSelected.toString());
    formDataDocument.append('DocumentStateId', uploaded); // Initial state
    formDataDocument.append('UserId', userInfo.id);
    formDataDocument.append('ExpirationDate', expiredDateUTC);
    formDataDocument.append('UploadDate', uploadDateUTC);
    formDataDocument.append('FileDocument', this.documentFile);

    this.service
    .service_general_post_file('document', formDataDocument)
    .subscribe(response => {
        // console.log('response', response);

        this.dialogRef.close(response);
      }
    );
  }

  // Update the file to upload
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.documentFile = event.target.files[0];
    }
  }

  // Click close event
  onNoClick(): void {
    // Return false
    this.dialogRef.close(false);
  }
}
