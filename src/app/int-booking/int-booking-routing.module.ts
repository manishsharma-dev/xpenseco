import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternationalBookingComponent } from './international-booking/international-booking.component';
const routes: Routes = [
  {
    path: '',
    component: InternationalBookingComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntBookingRoutingModule { }
