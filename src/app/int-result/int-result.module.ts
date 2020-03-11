import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntResultRoutingModule } from './int-result-routing.module';
import { InternationalResultComponent } from './international-result/international-result.component';
import{ShareModule} from "../share/share.module";
import { FlightserviceService } from '../services/flightservice.service';
import { Data } from "../providers/data/data";
import {AirportService} from '../services/airport.service';
import { Ng5SliderModule } from 'ng5-slider';
@NgModule({
  declarations: [InternationalResultComponent],
  imports: [
    CommonModule,
    IntResultRoutingModule,
    ShareModule,
    Ng5SliderModule
  ],
  providers: [FlightserviceService,Data,AirportService],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class IntResultModule { }
