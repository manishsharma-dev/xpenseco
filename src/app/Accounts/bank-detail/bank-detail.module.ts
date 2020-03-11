import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankDetailRoutingModule } from './bank-detail-routing.module';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { AccountService } from '../../services/account.service';
import { Data } from "../../providers/data/data";
import { PagingService } from '../../services/paging.service';
import{ShareModule} from "../../share/share.module";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BankDetailsComponent],
  imports: [
    CommonModule,
    BankDetailRoutingModule,
    ShareModule,
    FormsModule
  ],
  providers: [AccountService,PagingService,Data],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class BankDetailModule { }
