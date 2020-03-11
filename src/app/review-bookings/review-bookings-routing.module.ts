import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewBookingComponent } from './review-booking/review-booking.component';
const routes: Routes = [
  {
    path: '',
    component: ReviewBookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewBookingsRoutingModule { }
