import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkupRoutingModule } from './markup-routing.module';
import { AddMarkupComponent } from './add-markup/add-markup.component';
import { AccountService } from '../../services/account.service';
import { Data } from "../../providers/data/data";
import { PagingService } from '../../services/paging.service';
import{ShareModule} from "../../share/share.module";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AddMarkupComponent],
  imports: [
    CommonModule,
    MarkupRoutingModule,
    ShareModule,
    FormsModule
  ],
  providers: [AccountService,PagingService,Data],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class MarkupModule { }
