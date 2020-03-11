import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightBookingRoutingModule } from './flight-booking-routing.module';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FlightserviceService } from '../services/flightservice.service';
import { AirportService } from '../services/airport.service';
import { Data } from "../providers/data/data";
import{ShareModule} from "../share/share.module";
import { AlertComponent } from '../share/alert/alert.component';
import { MaterialModule } from '../share/material';
@NgModule({
  declarations: [FlightDetailComponent],
  imports: [
    CommonModule,
    FlightBookingRoutingModule,
     FormsModule,
     ShareModule,
     MaterialModule
     
  ],
  providers: [AirportService,FlightserviceService,Data],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [AlertComponent]
})
export class FlightBookingModule { }
