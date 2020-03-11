import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayresultRoutingModule } from './holidayresult-routing.module';
import { HolidayrComponent } from './holidayr/holidayr.component';

import { HolidayService } from '../services/holiday.service';
import { PagerService } from '../services/page.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Data } from "../providers/data/data";
import{ShareModule} from "../share/share.module";
// import{SafeHtmlPipe} from '../services/safe-html';


@NgModule({
  declarations: [HolidayrComponent],
  imports: [
    CommonModule,
    HolidayresultRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    FormsModule,
    ShareModule,
    // ShareModule,
    // SafeHtmlPipe
  ] ,
  providers: [HolidayService,PagerService,Data],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class HolidayresultModule { }
