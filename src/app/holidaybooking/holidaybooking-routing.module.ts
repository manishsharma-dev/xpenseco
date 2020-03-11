import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HolidaybComponent } from './holidayb/holidayb.component';
const routes: Routes = [
  {
    path: '',
    component: HolidaybComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidaybookingRoutingModule { }
