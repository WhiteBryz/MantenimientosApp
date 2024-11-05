import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {

  indexSelected: number = 0;

  pages = [
    {
      title: 'Inicio',
      url: './home',
      icon: 'home-outline'
    },
    {
      title: 'Hogar',
      url: './hogar',
      icon: 'hammer-outline'
    },
    {
      title: 'Vehículos',
      url: './vehiculos',
      icon: 'car-sport-outline'
    },
    {
      title: 'Salud personal',
      url: './salud-personal',
      icon: 'heart-circle-outline'
    },
    {
      title: 'Mascotas',
      url: './mascotas',
      icon: 'paw-outline'
    },
    {
      title: 'Estadísticas',
      url: './estadisticas',
      icon: 'bar-chart-outline'
    },
    {
      title: 'Configuración',
      url: './configuracion',
      icon: 'options-outline'
    },
  ];

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    private router: Router,
    private authService: AuthService,
    private menu: MenuController) {

  }

  ChangeIndexSelected(i: number) {
    this.indexSelected = i;
  }

  async SingOut() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Deseas salir de la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Si deseo salir',
          handler: () => {
              this.authService.logout();
              this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
    return;
  }

  // Abre y cierra el menú lateral
  toggleMenu() {
    this.menu.toggle();

  }

}
