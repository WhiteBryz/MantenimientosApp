import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaludPersonalPageRoutingModule } from './salud-personal-routing.module';

import { SaludPersonalPage } from './salud-personal.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaludPersonalPageRoutingModule,
    SharedModule
  ],
  declarations: [SaludPersonalPage]
})
export class SaludPersonalPageModule { }
