import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentabilidadRoutingModule } from './rentabilidad-routing.module';
import { RentabilidadMainComponent } from './components/rentabilidad-main/rentabilidad-main.component';


@NgModule({
  declarations: [
    RentabilidadMainComponent
  ],
  imports: [
    CommonModule,
    RentabilidadRoutingModule
  ]
})
export class RentabilidadModule { }
