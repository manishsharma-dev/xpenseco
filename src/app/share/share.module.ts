import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{HeaderComponent} from '../header/header.component';
import{RoundPipe} from '../providers/RoundPipe';
import { AlertComponent } from './alert/alert.component';
@NgModule({
  declarations: [HeaderComponent,RoundPipe,AlertComponent],
  imports:[
    CommonModule
  ],
  exports: [ HeaderComponent,RoundPipe, AlertComponent]
})
export class ShareModule { }
