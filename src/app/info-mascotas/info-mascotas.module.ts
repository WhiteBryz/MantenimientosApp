import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoMascotasPageRoutingModule } from './info-mascotas-routing.module';

import { InfoMascotasPage } from './info-mascotas.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoMascotasPageRoutingModule,
    SharedModule
  ],
  declarations: [InfoMascotasPage]
})
export class InfoMascotasPageModule {}
