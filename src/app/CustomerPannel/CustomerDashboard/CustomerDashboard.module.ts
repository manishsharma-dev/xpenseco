import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashboardRoutingModule } from './CustomerDashboard-routing.module';
import { CustomerDashboardComponent } from './CustomerDashboard/CustomerDashboard.component';
import { AgentService } from '../../services/agent.service';
import{ShareModule} from "../../share/share.module";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CustomerDashboardComponent],
  imports: [
    CommonModule,
    CustomerDashboardRoutingModule,
    ShareModule,
    FormsModule
  ],
  providers: [AgentService ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class CustomerDashboardModule { }
