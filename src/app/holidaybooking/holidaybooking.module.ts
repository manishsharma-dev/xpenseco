import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidaybookingRoutingModule } from './holidaybooking-routing.module';
import { HolidaybComponent } from './holidayb/holidayb.component';

import {HotelviewService} from '../services/hotelview.service'
import { HolidayService } from '../services/holiday.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Data } from "../providers/data/data";
import{ShareModule} from "../share/share.module";

@NgModule({
  declarations: [HolidaybComponent],
  imports: [
    CommonModule,
    HolidaybookingRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    FormsModule,
    ShareModule
  ] ,
  providers: [HotelviewService,HolidayService,Data],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ]
})
export class HolidaybookingModule { }
