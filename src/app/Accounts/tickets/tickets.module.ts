import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketComponent } from './ticket/ticket.component';
import { AccountService } from '../../services/account.service';
import{ShareModule} from "../../share/share.module";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
@NgModule({
  declarations: [TicketComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [AccountService],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class TicketsModule { }
