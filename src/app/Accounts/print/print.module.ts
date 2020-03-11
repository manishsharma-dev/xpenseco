import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintRoutingModule } from './print-routing.module';
import { InvoicePrintComponent } from './invoice-print/invoice-print.component';
import { AccountService } from '../../services/account.service';
import{ShareModule} from "../../share/share.module";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InvoicePrintComponent],
  imports: [
    CommonModule,
    PrintRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AccountService],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class PrintModule { }
