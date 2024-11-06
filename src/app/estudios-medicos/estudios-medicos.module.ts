import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudiosMedicosPageRoutingModule } from './estudios-medicos-routing.module';

import { EstudiosMedicosPage } from './estudios-medicos.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudiosMedicosPageRoutingModule,
    SharedModule
  ],
  declarations: [EstudiosMedicosPage]
})
export class EstudiosMedicosPageModule {}
