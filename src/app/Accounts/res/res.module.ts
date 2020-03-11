import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResRoutingModule } from './res-routing.module';
import { RescheduleComponent } from './reschedule/reschedule.component';
import { AccountService } from '../../services/account.service';
import{ShareModule} from "../../share/share.module";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RescheduleComponent],
  imports: [
    CommonModule,
    ResRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AccountService],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class ResModule { }
