import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasVetPageRoutingModule } from './citas-vet-routing.module';

import { CitasVetPage } from './citas-vet.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasVetPageRoutingModule,
    SharedModule
  ],
  declarations: [CitasVetPage]
})
export class CitasVetPageModule {}
