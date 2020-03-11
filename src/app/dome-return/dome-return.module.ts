import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirportService } from '../services/airport.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FlightserviceService } from '../services/flightservice.service';
import {Pipe, PipeTransform} from "@angular/core";
import { Data } from "../providers/data/data";
import {DatePipe} from '@angular/common';
import{ShareModule} from "../share/share.module";

import { DomeReturnRoutingModule } from './dome-return-routing.module';
import { FlightResultsComponent } from './flight-results/flight-results.component'; 
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [FlightResultsComponent],
  imports: [
    CommonModule,
    DomeReturnRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    FormsModule,
    ShareModule,
    Ng5SliderModule,
    
  ],
  providers: [AirportService,FlightserviceService,Data,DatePipe],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class DomeReturnModule { }
