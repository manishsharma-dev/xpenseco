import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BankDetailsComponent  } from '../bank-detail/bank-details/bank-details.component';
const routes: Routes = [ {
  path: '',
  component: BankDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankDetailRoutingModule { }
