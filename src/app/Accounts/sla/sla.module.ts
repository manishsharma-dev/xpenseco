import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SLARoutingModule } from './sla-routing.module';
import { ViewSLAComponent } from './view-sla/view-sla.component';
import{ShareModule} from "../../share/share.module";

@NgModule({
  declarations: [ViewSLAComponent],
  imports: [
    CommonModule,
    ShareModule
  ]
})
export class SLAModule { }
