import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValesRoutingModule } from './vales-routing.module';
import { ValesMainComponent } from './components/vales-main/vales-main.component';


@NgModule({
  declarations: [
    ValesMainComponent
  ],
  imports: [
    CommonModule,
    ValesRoutingModule
  ]
})
export class ValesModule { }
