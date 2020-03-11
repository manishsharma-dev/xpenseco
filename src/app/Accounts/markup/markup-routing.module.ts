import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMarkupComponent } from '../markup/add-markup/add-markup.component';
const routes: Routes = [
  {
    path: '',
    component: AddMarkupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarkupRoutingModule { }
