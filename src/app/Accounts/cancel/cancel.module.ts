import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancelRoutingModule } from './cancel-routing.module';
import { CancelRequestComponent } from './cancel-request/cancel-request.component';
import { AccountService } from '../../services/account.service';
import{ShareModule} from "../../share/share.module";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CancelRequestComponent],
  imports: [
    CommonModule,
    CancelRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AccountService],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class CancelModule { }
