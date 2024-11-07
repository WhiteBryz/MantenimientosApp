import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitasVetPage } from './citas-vet.page';

const routes: Routes = [
  {
    path: '',
    component: CitasVetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasVetPageRoutingModule {}
