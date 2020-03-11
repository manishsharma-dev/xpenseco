import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HoteldComponent } from './hoteld/hoteld.component';

const routes: Routes = [
  {
    path: '',
    component: HoteldComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoteldetailRoutingModule { }
