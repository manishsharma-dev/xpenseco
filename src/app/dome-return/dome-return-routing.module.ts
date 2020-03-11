import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightResultsComponent } from './flight-results/flight-results.component';
const routes: Routes = [
  {
    path: '',
    component: FlightResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomeReturnRoutingModule { }
