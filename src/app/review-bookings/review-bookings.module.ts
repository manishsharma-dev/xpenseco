import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewBookingsRoutingModule } from './review-bookings-routing.module';
import { ReviewBookingComponent } from './review-booking/review-booking.component';
import { FlightserviceService } from '../services/flightservice.service';
import { Data } from "../providers/data/data";
import{ShareModule} from "../share/share.module";

@NgModule({
  declarations: [ReviewBookingComponent],
  imports: [
    CommonModule,
    ReviewBookingsRoutingModule,
    ShareModule
  ],
  providers: [FlightserviceService,Data],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class ReviewBookingsModule { }
