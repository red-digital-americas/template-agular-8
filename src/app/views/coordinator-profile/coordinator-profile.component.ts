import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { MatDialog } from '@angular/material';

// Chips - 1
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Snackbar
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-coordinator-profile',
  templateUrl: './coordinator-profile.component.html',
  styleUrls: ['./coordinator-profile.component.css']
})

export class CoordinatorProfileComponent implements OnInit {
  // Emergency Contactos
  // One paginator and sort per table - Table 1
  @ViewChild(MatPaginator, { static: true }) paginatorEC: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortEC: MatSort;

  // Documents
  // One paginator and sort per table - Table 1
  @ViewChild(MatPaginator, { static: true }) paginatorDocs: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortDocs: MatSort;

  // Trainings
  // One paginator and sort per table - Table 1
  @ViewChild(MatPaginator, { static: true }) paginatorTra: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortTra: MatSort;

  // edit: true -> Edit, false -> Read
  edit = false;

  // Catalogs
  // Countries catalog
  countriesCatalog: any;
  // Citites catalog
  citiesCatalog: any;
  // States catalog
  statesCatalog: any;
  // Cities phone catalog
  citiesphoneCatalog: any;

  // Options selected
  // Option selected countries - Select 3
  countrySelected: number;
  // Option selected cities - Select 3
  citySelected: number;
  // Option selected states - Select 3
  stateSelected: number;
  // Option selected cities (phone) - Select 3
  cityPhoneSelected: number;

  // Chips - 2
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  languageCtrl = new FormControl();
  filteredLanguages: Observable<string[]>;

  @ViewChild('languageInput', { static: true }) languageInput: ElementRef;

  // Select items
  languagesCatalog: any = []; // Catalog
  languagesSelected: any = []; // In edit mode
  spokenLanguage: string[]; // In read mode
  idsLanguagesSelected: any[]; // For update service

  // Input profile
  // Profile information
  jobTitle: string;
  firstName: string;
  lastName: string;
  cityBirth: string;
  stateBirth: string;
  countryBirth: string;
  office: string;
  activeSince: string;
  aboutMe: string;
  supplierCT: string;
  // Direction information
  currentAddress: string;
  cityAddress: string;
  stateAddress: string;
  countryAddress: string;
  zipCode: string;
  // Contact information
  phoneNumber: string;
  cityPhone: string;
  idNumber: number;
  premierEmail: string;
  personalEmail: string;
  dateBirth: string;
  // Allergies information
  allergies: string;

  // Table definitions
  // Datasource Emergency Contacts - Table 2
  dataSourceEC = new MatTableDataSource();
  // Datasource Documents - Table 2
  dataSourceDocs = new MatTableDataSource();
  // Datasource Trainings - Table 2
  dataSourceTra = new MatTableDataSource();

  // Columns definitions
  // Columns Emergency Contacts - Table 3
  displayedColumnsEC: string[] = [
    'fullName',
    'relation',
    'contactNumber1',
    'contactNumber2',
    'deleteButton'
  ];
  // Columns Documents - Table 3
  displayedColumnsDocs: string[] = [
    'documentType',
    'uploadDate',
    'expirationDate',
    'documentState',
    'deleteButton'
  ];
  // Columns Trainings - Table 3
  displayedColumnsTra: string[] = [
    'course',
    'porcentage'
  ];

  constructor(private service: GeneralService, public dialog: MatDialog) {
    // chips - 3
    this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((language: string | null) => language ? this._filter(language) : this.languagesCatalog.slice()));
  }

  ngOnInit() {
    // console.log('ngOnInit()');

    // Get user info from localStorage
    // console.log(localStorage.getItem('user'));
    // tslint:disable-next-line: no-shadowed-variable
    let userInfo = JSON.parse(localStorage.getItem('user'));
    // console.log('userInfo', userInfo);

    // Get data user
    this.service
      .service_general_get('user/' + userInfo.personalEmail)
      .subscribe(response => {
        // console.log(response);

        if (response.data.user !== undefined) {
          // console.log('response.data.user', response.data.user);
          // Set data user in local storage
          localStorage.setItem('user', JSON.stringify(response.data.user));

          userInfo = JSON.parse(localStorage.getItem('user'));
        }

        // Init form
        this.initCatalogs(userInfo);
        this.initFields(userInfo);
        this.initTables(userInfo);
      });
  }

  changeMode(modeButton) {
    // console.log('changeMode()');

    // if click on Save
    if (modeButton) {
      // console.log('if (modeButton)');

      // tslint:disable-next-line: no-shadowed-variable
      const userInfo = JSON.parse(localStorage.getItem('user'));

      // Iterate to save languages - Create object for relations much to much
      this.idsLanguagesSelected = [];

      for (let x = 0; x < this.languagesSelected.length; x++) {
        this.idsLanguagesSelected.push({
          UserId: userInfo.id,
          LanguageId: this.languagesSelected[x].id
        });
      }

      // Parameters request
      const user = {
        AboutMe: this.aboutMe,
        CurrentAddress: this.currentAddress,
        CountryAddressId: this.countrySelected,
        CityAddressId: this.citySelected,
        StateAddressId: this.stateSelected,
        ZipCode: this.zipCode,
        PhoneNumber: this.phoneNumber,
        CityPhoneId: this.cityPhoneSelected,
        PersonalEmail: this.personalEmail,
        PremierEmail: this.premierEmail,
        RelUsersLanguages: this.idsLanguagesSelected
      };

      // Update user
      this.service
        .service_general_put('user/' + userInfo.id, user)
        .subscribe(response => {
          // console.log('response', response);

          // tslint:disable-next-line: no-shadowed-variable
          let userInfo = JSON.parse(localStorage.getItem('user'));

          // Get data user
          this.service
            .service_general_get('user/' + userInfo.personalEmail)
            // tslint:disable-next-line: no-shadowed-variable
            .subscribe(response => {
              // console.log(response);

              if (response.data.user !== undefined) {
                // console.log('response.data.user', response.data.user);
                // Set data user in local storage
                localStorage.setItem('user', JSON.stringify(response.data.user));

                userInfo = JSON.parse(localStorage.getItem('user'));
              }

              // Init form
              this.initCatalogs(userInfo);
              this.initFields(userInfo);
              this.initTables(userInfo);
            });

          this.edit = !this.edit;
        });
    } else {
      // Update user info from localStorage
      // console.log(localStorage.getItem('user'));
      // tslint:disable-next-line: no-shadowed-variable
      let userInfo = JSON.parse(localStorage.getItem('user'));
      // console.log('userInfo', userInfo);

      // Get data user
      this.service
        .service_general_get('user/' + userInfo.personalEmail)
        .subscribe(response => {
          // console.log(response);

          if (response.data.user !== undefined) {
            // console.log('response.data.user', response.data.user);
            // Set data user in local storage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            userInfo = JSON.parse(localStorage.getItem('user'));
          }

          // Init form
          this.initCatalogs(userInfo);
          this.initFields(userInfo);
          this.initTables(userInfo);

          this.edit = !this.edit;
        });
    }
  }

  // tslint:disable-next-line: no-shadowed-variable
  initCatalogs(userInfo) {
    // console.log('initCatalogs(userInfo)');
    // console.log('userInfo', userInfo);

    // Init catalogs
    // Init countries catalog
    this.service
      .service_general_get('catcountry/list/')
      .subscribe(response => {
        this.countriesCatalog = response.data.countriesList;
      });

    // Init cities catalog
    this.service
      .service_general_get('catcity/list/' + userInfo.countryAddressId)
      .subscribe(response => {
        // console.log(response);

        if (response.data) {
          this.citiesCatalog = response.data.citiesList;
        }
      });

    // Init states catalog
    this.service
      .service_general_get('catstate/list/' + userInfo.cityAddressId)
      .subscribe(response => {
        // console.log(response);

        if (response.data) {
          this.statesCatalog = response.data.statesList;
        }
      });

    // Init cities phone catalog
    this.service
      .service_general_get('catcity/list/')
      .subscribe(response => {
        this.citiesphoneCatalog = response.data.citiesList;
      });

    // Init languages catalog
    this.service
      .service_general_get('catlanguage/list/')
      .subscribe(response => {
        // console.log('response', response);

        this.languagesCatalog = response.data.languagesList;
      });

    // Init current selected options

    // Country
    this.countrySelected = userInfo.countryAddress.id;
    // City
    this.citySelected = userInfo.cityAddress.id;
    // State
    this.stateSelected = userInfo.stateAddress.id;
    // City Phone
    this.cityPhoneSelected = userInfo.cityPhone.id;
    // Languages
    this.languagesSelected = [];
    this.spokenLanguage = [];

    // Iterate to save languages
    const languages = userInfo.relUsersLanguages;
    for (let x = 0; x < languages.length; x++) {
      this.spokenLanguage.push(' ' + languages[x].language.language);
      this.languagesSelected.push(languages[x].language);
    }
  }

  initFields(userInfo) {
    // Set fields profile
    this.jobTitle = userInfo.jobTitle;
    this.firstName = userInfo.firstName;
    this.lastName = userInfo.lastName;
    this.countryBirth = userInfo.countryBirth.country;
    this.cityBirth = userInfo.cityBirth.city;
    this.stateBirth = userInfo.stateBirth.state;
    this.office = userInfo.office;
    this.activeSince = new Date(userInfo.activeSince).toLocaleString();
    this.aboutMe = userInfo.aboutMe;
    this.supplierCT = userInfo.supplierCt;

    // Set fields address
    this.currentAddress = userInfo.currentAddress;
    this.countryAddress = userInfo.countryAddress.country;
    this.cityAddress = userInfo.cityAddress.city;
    this.stateAddress = userInfo.stateAddress.state;
    this.zipCode = userInfo.zipCode;

    // Set fields contact
    this.phoneNumber = userInfo.phoneNumber;
    this.cityPhone = userInfo.cityPhone.city;
    this.idNumber = userInfo.idNumber;
    this.premierEmail = userInfo.premierEmail;
    this.personalEmail = userInfo.personalEmail;
    this.dateBirth = new Date(userInfo.dateBirth).toLocaleString();

    // Set fields allergies
    this.allergies = userInfo.allergies;
  }

  initTables(userInfo) {
    // Emergency contacts
    this.dataSourceEC.data = userInfo.emergencyContacts;
    // Documents
    this.dataSourceDocs.data = userInfo.documents;
    // Trainings
    this.dataSourceTra.data = userInfo.trainings;
  }

  countryChange() {
    // console.log('countryChange()');
    // console.log(this.countrySelected);

    // Update cities list
    this.service
      .service_general_get('catcity/list/' + this.countrySelected)
      .subscribe(response => {
        // console.log(response);

        this.citiesCatalog = response.data.citiesList;

        // If change country, clean states
        this.statesCatalog = [];
      });
  }

  cityChange() {
    // console.log('cityChange()');
    // console.log(this.citySelected);

    // Update states list
    this.service
      .service_general_get('catstate/list/' + this.citySelected)
      .subscribe(response => {
        // console.log(response);

        this.statesCatalog = response.data.statesList;
      });
  }

  modalAddEmergencyContact() {
    // console.log('modalAddEmergencyContact()');

    // Relation - Catalog list
    this.service
      .service_general_get('catrelation/list/')
      .subscribe(response => {
        // console.log(response);

        const relationsCatalog = response.data.relationsList;

        const dialogRef = this.dialog.open(DialogComponent, {
          width: '700px',
          disableClose: true,
          data: {
            titulo: 'EMERGENCY CONTACT',
            response: relationsCatalog,
            tipo: 'emergencyContact'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          // console.log('result', result);

          // If no close modal
          if (result) {
            // Update the emergency contact table
            this.dataSourceEC = result.data.emergencyContactsList;
          }
        });
      });
  }

  deleteEmergentContact(emergencyContact) {
    // console.log('deleteEmergentContact()');
    // console.log('emergencyContact', emergencyContact);

    const idEmergencyContact = emergencyContact.id;

    this.service
      .service_general_delete('emergencycontact/' + idEmergencyContact)
      .subscribe(response => {
        // console.log('response', response);

        this.dataSourceEC = response.data.emergencyContactsList;
      });
  }

  modalAddDocument() {
    // console.log('modalAddDocument()');

    // Document type - Catalog list
    this.service
      .service_general_get('catdocumenttype/list/')
      .subscribe(response => {
        // console.log(response);

        const documenttypesCatalog = response.data.documenttypesList;

        const dialogRef = this.dialog.open(DialogComponent, {
          width: '700px',
          disableClose: true,
          data: {
            titulo: 'UPLOAD A DOCUMENT',
            response: documenttypesCatalog,
            tipo: 'document'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          // console.log('result', result);

          // If no close modal
          if (result) {
            // Update the document table
            this.dataSourceDocs.data = result.data.documentsList;
          }
        });
      });
  }

  deleteDocument(document) {
    // console.log('deleteDocument(document)()');
    // console.log('document', document);

    const idDocument = document.id;

    this.service
      .service_general_delete('document/' + idDocument)
      .subscribe(response => {
        // console.log('response', response);

        this.dataSourceDocs = response.data.documentsList;
      });
  }

  // Chips - 4
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our language
    if ((value || '').trim()) {
      this.languagesSelected.push({
        id: Math.random(),
        language: value.trim()
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.languageCtrl.setValue(null);
  }

  remove(indx): void {
    this.languagesSelected.splice(indx, 1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.languagesSelected.push(event.option.value);
    this.languageInput.nativeElement.value = '';
    this.languageCtrl.setValue(null);
  }

  private _filter(value: any): any[] {
    return this.languagesCatalog.filter(language => language.language.toLowerCase().includes(value));
  }
  // ./Chips

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    // console.log('ngAfterViewInit()');

    // Set paginator and sort - Table 5
    // Emergency contacts
    /*
    this.dataSourceEC.paginator = this.paginatorEC;
    this.paginatorEC._intl.itemsPerPageLabel = 'Registros por página';
    this.dataSourceEC.sort = this.sortEC;
    */

    // TODO Error
    /*
    // Set paginator and sort - Table 6
    // Documents
    this.dataSourceDocs.paginator = this.paginatorDocs;
    this.paginatorDocs._intl.itemsPerPageLabel = 'Registros por página';
    this.dataSourceDocs.sort = this.sortDocs;*/

    // Set spanish paginator - Table 7 * TODO
    // Emergency contacts
    /*const rangoLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }

      length = Math.max(length, 0);

      const startIndex = page * pageSize;

      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };

    this.dataSourceEC.paginator._intl.getRangeLabel = rangoLabel;*/
  }
}
