import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasVetPageRoutingModule } from './citas-vet-routing.module';

import { CitasVetPage } from './citas-vet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasVetPageRoutingModule
  ],
  declarations: [CitasVetPage]
})
export class CitasVetPageModule {}
