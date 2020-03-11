import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSLAComponent } from '../sla/view-sla/view-sla.component';
const routes: Routes = [
  {
    path: '',
    component: ViewSLAComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SLARoutingModule { }
