import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegurosSaludPage } from './seguros-salud.page';

const routes: Routes = [
  {
    path: '',
    component: SegurosSaludPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegurosSaludPageRoutingModule {}
