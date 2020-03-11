import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffListRoutingModule } from './staff-list-routing.module';
import { ViewStaffComponent } from './view-staff/view-staff.component';
import { AgentService } from '../../services/agent.service';
import{ShareModule} from "../../share/share.module";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewStaffComponent],
  imports: [
    CommonModule,
    StaffListRoutingModule,
    ShareModule,
    FormsModule
  ],
  providers: [AgentService ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class StaffListModule { }
