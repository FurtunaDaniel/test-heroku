import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtFormComponent } from './jwt-form/jwt-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtFormService } from './core/jwtForm.service';
import { HttpClientModule } from '@angular/common/http';
import { EscapeHtmlPipe } from './core/keep-html.pipe';
import { ModalComponent } from './modal/modal.component';
import { DataService } from './core/data.service';
@NgModule({
  declarations: [
    AppComponent,
    JwtFormComponent,
    EscapeHtmlPipe,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  entryComponents: [ModalComponent],
  providers: [ JwtFormService, DataService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
