import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerInvoiceComponent } from '../invoice/customer-invoice/customer-invoice.component';
const routes: Routes = [
  {
    path: '',
    component: CustomerInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
