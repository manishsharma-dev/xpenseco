import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelseachComponent } from './hotelseach/hotelseach.component';

const routes: Routes = [
  {
    path: '',
    component: HotelseachComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelsRoutingModule { }
