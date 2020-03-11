import { NgModule ,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidaydetailRoutingModule } from './holidaydetail-routing.module';
import { HolidaydComponent } from './holidayd/holidayd.component';

import { HolidayService } from '../services/holiday.service';
import { PagerService } from '../services/page.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Data } from "../providers/data/data";
import{ShareModule} from "../share/share.module";


@NgModule({
  declarations: [HolidaydComponent],
  imports: [
    CommonModule,
    HolidaydetailRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    FormsModule,
    ShareModule
  ] ,
  providers: [HolidayService,PagerService,Data],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class HolidaydetailModule { }
