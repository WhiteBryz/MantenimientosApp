import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfiguracionPageRoutingModule } from './configuracion-routing.module';
import { ConfiguracionPage, CuentaModalComponent, EstiloModalComponent } from './configuracion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ConfiguracionPageRoutingModule
  ],
  declarations: [
    ConfiguracionPage,
    CuentaModalComponent,
    EstiloModalComponent
  ]
})
export class ConfiguracionPageModule { }