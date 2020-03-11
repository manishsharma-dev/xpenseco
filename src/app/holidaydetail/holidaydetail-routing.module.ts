import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HolidaydComponent } from './holidayd/holidayd.component';
const routes: Routes = [
  {
    path: '',
    component: HolidaydComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidaydetailRoutingModule { }
