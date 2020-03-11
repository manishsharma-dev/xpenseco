import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchTransactionComponent } from '../transaction/search-transaction/search-transaction.component';
const routes: Routes = [
  {
    path: '',
    component: SearchTransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
