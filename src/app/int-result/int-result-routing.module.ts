import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternationalResultComponent } from './international-result/international-result.component';
const routes: Routes = [
  {
    path: '',
    component: InternationalResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntResultRoutingModule { }
