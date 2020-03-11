import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAddRoutingModule } from './customer-add-routing.module';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    CustomerAddRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule
  ]
})
export class CustomerAddModule { }
