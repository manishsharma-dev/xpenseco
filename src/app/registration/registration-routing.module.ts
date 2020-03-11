import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgeentRegistrationComponent } from './ageent-registration/ageent-registration.component';
const routes: Routes = [
  {
    path: '',
    component: AgeentRegistrationComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
