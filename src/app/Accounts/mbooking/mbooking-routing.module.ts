import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MybookingComponent } from '../mbooking/mybooking/mybooking.component';
const routes: Routes = [
  {
    path: '',
    component: MybookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MBookingRoutingModule { }
