import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'side-menu',
    loadChildren: () => import('./side-menu/side-menu.module').then(m => m.SideMenuPageModule)
  },  {
    path: 'vehiculos',
    loadChildren: () => import('./vehiculos/vehiculos.module').then( m => m.VehiculosPageModule)
  },
  {
    path: 'salud-personal',
    loadChildren: () => import('./salud-personal/salud-personal.module').then( m => m.SaludPersonalPageModule)
  },
  {
    path: 'mascotas',
    loadChildren: () => import('./mascotas/mascotas.module').then( m => m.MascotasPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'hogar',
    loadChildren: () => import('./hogar/hogar.module').then( m => m.HogarPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
