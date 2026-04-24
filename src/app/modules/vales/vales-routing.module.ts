import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValesMainComponent } from './components/vales-main/vales-main.component';

const routes: Routes = [
  {
    path: '',
    component: ValesMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValesRoutingModule { }
