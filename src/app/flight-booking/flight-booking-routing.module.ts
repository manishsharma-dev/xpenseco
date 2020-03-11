import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
const routes: Routes = [
  {
    path: '',
    component: FlightDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightBookingRoutingModule { }
