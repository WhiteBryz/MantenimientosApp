import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'side-menu',
    loadChildren: () => import('./side-menu/side-menu.module').then(m => m.SideMenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  },
  {
    path: 'seguros-salud',
    loadChildren: () => import('./seguros-salud/seguros-salud.module').then( m => m.SegurosSaludPageModule)
  },
  {
    path: 'estudios-medicos',
    loadChildren: () => import('./estudios-medicos/estudios-medicos.module').then( m => m.EstudiosMedicosPageModule)
  },  {
    path: 'info-mascotas',
    loadChildren: () => import('./info-mascotas/info-mascotas.module').then( m => m.InfoMascotasPageModule)
  },
  {
    path: 'vacunas',
    loadChildren: () => import('./vacunas/vacunas.module').then( m => m.VacunasPageModule)
  },
  {
    path: 'citas-vet',
    loadChildren: () => import('./citas-vet/citas-vet.module').then( m => m.CitasVetPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
