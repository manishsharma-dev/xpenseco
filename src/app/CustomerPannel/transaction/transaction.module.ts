import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { SearchTransactionComponent } from './search-transaction/search-transaction.component';
import { AgentService } from '../../services/agent.service';
import{ShareModule} from "../../share/share.module";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { PagingService } from '../../services/paging.service'

@NgModule({
  declarations: [SearchTransactionComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ShareModule,
    FormsModule
    
  ],
  providers: [AgentService,PagingService ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class TransactionModule { }
