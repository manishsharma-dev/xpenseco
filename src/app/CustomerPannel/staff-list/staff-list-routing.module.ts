import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewStaffComponent } from '../staff-list/view-staff/view-staff.component'
const routes: Routes = [
  {
    path: '',
    component: ViewStaffComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffListRoutingModule { }
