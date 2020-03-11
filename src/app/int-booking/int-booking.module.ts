import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntBookingRoutingModule } from './int-booking-routing.module';
import { InternationalBookingComponent } from './international-booking/international-booking.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FlightserviceService } from '../services/flightservice.service';
import { AirportService } from '../services/airport.service';
import { Data } from "../providers/data/data";
import{ShareModule} from "../share/share.module";
import { Ng5SliderModule } from 'ng5-slider';
@NgModule({
  declarations: [InternationalBookingComponent],
  imports: [
    CommonModule,
    IntBookingRoutingModule,
    FormsModule,
    ShareModule,
    Ng5SliderModule
  ],
  providers: [AirportService,FlightserviceService,Data],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class IntBookingModule { }
