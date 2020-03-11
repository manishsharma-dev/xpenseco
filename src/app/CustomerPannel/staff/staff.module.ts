import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { AgentService } from '../../services/agent.service';
import{ShareModule} from "../../share/share.module";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddStaffComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    ShareModule,
    FormsModule
  ],
  providers: [AgentService ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class StaffModule { }
