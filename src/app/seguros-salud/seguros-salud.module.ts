import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegurosSaludPageRoutingModule } from './seguros-salud-routing.module';

import { SegurosSaludPage } from './seguros-salud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegurosSaludPageRoutingModule
  ],
  declarations: [SegurosSaludPage]
})
export class SegurosSaludPageModule {}
