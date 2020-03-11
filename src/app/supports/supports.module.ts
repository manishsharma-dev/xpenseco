import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportsRoutingModule } from './supports-routing.module';
import { SupportComponent } from './support/support.component';
import { SupportService } from '../services/support.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import{ShareModule} from "../share/share.module";
@NgModule({
  declarations: [SupportComponent],
  imports: [
    CommonModule,
    SupportsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ShareModule
  ],
  providers: [SupportService],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
})
export class SupportsModule { }
