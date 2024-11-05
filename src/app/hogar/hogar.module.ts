import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HogarPageRoutingModule } from './hogar-routing.module';

import { HogarPage } from './hogar.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HogarPageRoutingModule,
    SharedModule
  ],
  declarations: [HogarPage]
})
export class HogarPageModule { }
