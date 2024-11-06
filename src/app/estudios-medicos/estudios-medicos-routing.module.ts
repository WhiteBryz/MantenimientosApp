import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudiosMedicosPage } from './estudios-medicos.page';

const routes: Routes = [
  {
    path: '',
    component: EstudiosMedicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudiosMedicosPageRoutingModule {}
