import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightserviceService } from '../services/flightservice.service';
import { HotelService } from '../services/hotel.service';
import { ThankYouRoutingModule } from './thank-you-routing.module';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ThankyouComponent],
  imports: [
    CommonModule,
    ThankYouRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [HotelService,FlightserviceService],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class ThankYouModule { }
