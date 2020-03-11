import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CancelRequestComponent } from '../cancel/cancel-request/cancel-request.component';
const routes: Routes = [
  {
    path: '',
    component: CancelRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelRoutingModule { }
