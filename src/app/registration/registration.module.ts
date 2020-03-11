import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { AgeentRegistrationComponent } from './ageent-registration/ageent-registration.component';
import { AgentService } from '../services/agent.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AgeentRegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AgentService],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class RegistrationModule { }
