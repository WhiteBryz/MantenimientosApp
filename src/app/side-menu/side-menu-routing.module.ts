import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideMenuPage } from './side-menu.page';

const routes: Routes = [
  {
    path: '',
    component: SideMenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'vehiculos',
        loadChildren: () => import('../vehiculos/vehiculos.module').then(m => m.VehiculosPageModule)
      },
      {
        path: 'salud-personal',
        loadChildren: () => import('../salud-personal/salud-personal.module').then(m => m.SaludPersonalPageModule)
      },
      {
        path: 'mascotas',
        loadChildren: () => import('../mascotas/mascotas.module').then(m => m.MascotasPageModule)
      },
      {
        path: 'estadisticas',
        loadChildren: () => import('../estadisticas/estadisticas.module').then(m => m.EstadisticasPageModule)
      },
      {
        path: 'configuracion',
        loadChildren: () => import('../configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
      },
      {
        path: 'hogar',
        loadChildren: () => import('../hogar/hogar.module').then(m => m.HogarPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuPageRoutingModule { }
