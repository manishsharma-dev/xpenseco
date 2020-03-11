import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelseachComponent } from './hotelseach/hotelseach.component';

import {HotelviewService} from '../services/hotelview.service'
import { HotelService } from '../services/hotel.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { data } from "../providers/data/search-result-data";
import{ShareModule} from "../share/share.module";
import {HotelModel} from '../model/hotelmodel';
import {Master} from '../model/hotelsearchrequest';
import { PagerService } from '../services/page.service';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [HotelseachComponent],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    FormsModule,
    ShareModule,
    Ng5SliderModule,

  ] ,
  providers: [HotelviewService,PagerService,HotelService],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class HotelsModule { }
