import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, MenuController } from '@ionic/angular';

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

<<<<<<< HEAD
  constructor(public alertController: AlertController, public navCtrl: NavController, private menu: MenuController) { 
=======
  constructor(public alertController: AlertController, public navCtrl: NavController) {
>>>>>>> c538329c204bf0ee9fb5331e2fab629267dffa92
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
            localStorage.removeItem("usuarioActual");
            this.navCtrl.navigateRoot('login');
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
