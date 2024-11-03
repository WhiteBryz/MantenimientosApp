import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

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
      url: './Home',
      icon: '/assets/icon/home.svg'
    },
    {
      title: 'Hogar',
      url: './clientes',
      icon: 'hammer-outline'
    },
    {
      title: 'Vehículos',
      url: './vehicles',
      icon: 'car-sport-outline'
    },
    {
      title: 'Salud personal',
      url: './selfcare',
      icon: 'heart-circle-outline'
    },
    {
      title: 'Mascotas',
      url: './pets',
      icon: '/assets/icon/pets.svg'
    },
    {
      title: 'Estadísticas',
      url: './home',
      icon: 'bar-chart-outline'
    },
    {
      title: 'Configuración',
      url: './config',
      icon: '/assets/icon/config.svg'
    },
  ];

  constructor(public alertController: AlertController, public navCtrl: NavController) { }

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

}
