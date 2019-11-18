import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { JwtFormService } from '../core/jwtForm.service';
import { ModalComponent } from '../modal/modal.component';
import { DataService } from '../core/data.service';

@Component( {
  selector: "app-jwt-form",
  templateUrl: "./jwt-form.component.html",
  styleUrls: [ "./jwt-form.component.scss" ]
} )
export class JwtFormComponent implements OnInit {
  public jwtForm: FormGroup;
  public faCalendarAlt = faCalendarAlt;
  public submitted = false;
  public isTranslator = false;
  message: string;

  public normalServices = [
    "SSC_STANDARD_SINGLE",
    "SSC_STANDARD_GROUP",
    "SSC_1DAY_SINGLE",
    "SSC_1DAY_GROUP"
  ];

  public translatorServices = [
    "SSC_STANDARD_SINGLE_TRANSLATOR",
    "SSC_STANDARD_GROUP_TRANSLATOR",
    "SSC_1DAY_SINGLE_TRANSLATOR",
    "SSC_1DAY_GROUP_TRANSLATOR"
  ];

  public environments = [
    {
      name: "development",
      cipher_key: "b3d161a9b5"
    },
    { name: "staging", cipher_key: "90c4948dc7" },
    {
      name: "production",
      cipher_key: "aec525f2d16"
    }
  ];

  model: NgbDateStruct;
  date: { year: number; month: number };

  constructor( private calendar: NgbCalendar, private jwt: JwtFormService, private modal: NgbModal, private data: DataService ) { }

  ngOnInit() {
    this.jwtForm = new FormGroup( {
      uan: new FormControl( '', [
        Validators.required,
        Validators.pattern( '^\\d{4}-\\d{4}-\\d{4}-\\d{4}$' )
      ] ),
      env: new FormControl( this.environments[ 0 ].name ),
      cipher_key: new FormControl( '', Validators.required ),
      service: new FormControl( '', Validators.required ),
      language: new FormControl( 'Mandarin' ),
      gender: new FormControl( 'Male' ),
      application_date: new FormControl( this.calendar.getToday(), Validators.required )
    } );
    this.data.currentMessage.subscribe( message => this.message = message )
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.jwtForm.controls;
  }

  public onSubmit( event ): void {
    event.preventDefault();
    this.submitted = true;
    // stop here if form is invalid
    if ( this.jwtForm.invalid ) {
      return;
    }

    let payload = this.jwtForm.value;
    // parse the date in YYYY-mm-dd format 2019-11-04
    payload.application_date = `${this.f.application_date.value.year}-${this.f.application_date.value.month}-${this.f.application_date.value.day}`;
    // force uppercase of service ref
    payload.service = payload.service.toUpperCase();
    this.jwt.generate( payload ).subscribe( data => {

    }, error => {
      console.log( 'The post token did not worked at least this thinks...' );
      this.data.changeMessage( error.error.text )
      this.modal.open( ModalComponent ).result.then( ( result ) => {
      }, ( reason ) => {

      } );

    } )
  }

  public copyToService( element ) {
    this.jwtForm.patchValue( { 'service': element.innerHTML } );
  }
  public fieldChanged( field ) {

    switch ( field ) {
      case 'service':
        this.isTranslator = !!this.translatorServices.find( service => {
          return ( service == this.f.service.value.toUpperCase() );
        } );
        break;
      case 'cipher_key':
        this.environments.filter( item => {
          if ( item.cipher_key.includes( this.jwtForm.value.cipher_key ) ) {
            this.jwtForm.patchValue( { env: item.name } );
          } else {
            this.jwtForm.patchValue( { env: this.environments[ 0 ].name } );
          }
        } );
        break;

      default:
        break;
    }
  }
}
