import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MakePaymentComponent } from '../mpayment/make-payment/make-payment.component';

const routes: Routes = [
  {
    path: '',
    component: MakePaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MPaymentRoutingModule { }
