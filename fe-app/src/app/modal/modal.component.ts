import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../core/data.service';

@Component( {
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [ './modal.component.scss' ]
} )
export class ModalComponent implements OnInit {

  @Input() jwtForm;
  message: string;

  constructor(
    public activeModal: NgbActiveModal,
    private data: DataService
  ) { }
  ngOnInit() {
    // get jwt form from the API response
    this.data.currentMessage.subscribe( message => {
    this.jwtForm = message
    } )
  }

}
