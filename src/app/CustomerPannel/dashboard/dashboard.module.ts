import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { AgentService } from '../../services/agent.service';
import{ShareModule} from "../../share/share.module";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AgentDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule,
    FormsModule
  ],
  providers: [AgentService ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule { }
