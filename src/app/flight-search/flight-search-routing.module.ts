import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightResultComponent } from './flight-result/flight-result.component';
const routes: Routes = [
  {
    path: '',
    component: FlightResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightSearchRoutingModule { }
