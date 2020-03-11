import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';
import { HotelsComponent } from './hotels/hotels.component';
import {HotelviewService} from '../services/hotelview.service'
import { HotelService } from '../services/hotel.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Data } from "../providers/data/data";
import{ShareModule} from "../share/share.module";
import {HotelModel} from '../model/hotelmodel';
import {Master} from '../model/hotelsearchrequest';

@NgModule({
  declarations: [HotelsComponent],
  imports: [
    CommonModule,
    HotelRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    FormsModule,
    ShareModule
  ] ,
  providers: [HotelviewService,HotelService,Data],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class HotelModule { }
