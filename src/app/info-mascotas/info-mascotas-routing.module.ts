import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoMascotasPage } from './info-mascotas.page';

const routes: Routes = [
  {
    path: '',
    component: InfoMascotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoMascotasPageRoutingModule {}
