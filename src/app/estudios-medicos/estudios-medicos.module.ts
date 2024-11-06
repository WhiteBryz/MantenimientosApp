import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudiosMedicosPageRoutingModule } from './estudios-medicos-routing.module';

import { EstudiosMedicosPage } from './estudios-medicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudiosMedicosPageRoutingModule
  ],
  declarations: [EstudiosMedicosPage]
})
export class EstudiosMedicosPageModule {}
