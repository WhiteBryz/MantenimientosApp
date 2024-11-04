import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaludPersonalPageRoutingModule } from './salud-personal-routing.module';

import { SaludPersonalPage } from './salud-personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaludPersonalPageRoutingModule
  ],
  declarations: [SaludPersonalPage]
})
export class SaludPersonalPageModule {}
