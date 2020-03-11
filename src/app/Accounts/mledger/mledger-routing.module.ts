import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyledgerComponent } from '../mledger/myledger/myledger.component';
const routes: Routes = [
  {
    path: '',
    component: MyledgerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MLedgerRoutingModule { }
