import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfiguracionPageRoutingModule } from './configuracion-routing.module';
import { ConfiguracionPage, CuentaModalComponent, EstiloModalComponent, MenuVisibilityModalComponent } from './configuracion.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ConfiguracionPageRoutingModule,
    SharedModule
  ],
  declarations: [
    ConfiguracionPage,
    CuentaModalComponent,
    EstiloModalComponent,
    MenuVisibilityModalComponent
  ]
})
export class ConfiguracionPageModule { }