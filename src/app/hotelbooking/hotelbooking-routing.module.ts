import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelbComponent } from './hotelb/hotelb.component';
const routes: Routes = [
  {
    path: '',
    component: HotelbComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelbookingRoutingModule { }
