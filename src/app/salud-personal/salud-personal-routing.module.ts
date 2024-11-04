import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaludPersonalPage } from './salud-personal.page';

const routes: Routes = [
  {
    path: '',
    component: SaludPersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaludPersonalPageRoutingModule {}
