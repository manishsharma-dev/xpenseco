import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FlightRoutingModule } from './flight-routing.module';
import { FlightsComponent } from './flights/flights.component';
import { AirportService } from '../services/airport.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Data } from "../providers/data/data";
import{ShareModule} from "../share/share.module";
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [FlightsComponent],
  imports: [
    CommonModule,
    FlightRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    FormsModule,
    ShareModule,
    TypeaheadModule.forRoot()
  ] ,
  providers: [AirportService,Data],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class FlightModule { }
