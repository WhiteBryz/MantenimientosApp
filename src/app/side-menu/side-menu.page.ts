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
  subMenuOpen: { [key: number]: boolean } = {};

  pages = [
    {
      title: 'Inicio',
      url: './home',
      icon: 'home-outline',
      hidden: false
    },
    {
      title: 'Hogar',
      url: './hogar',
      icon: 'hammer-outline',
      hidden: false
    },
    {
      title: 'Vehículos',
      url: './vehiculos',
      icon: 'car-sport-outline',
      hidden: false
    },
    {
      title: 'Salud personal',
      url: './',
      icon: 'heart-circle-outline',
      hidden: false,
      childs: [
        {
          title: 'Seguros de Salud',
          url: './seguros-salud',
          icon: '',
          hidden: false
        },
        {
          title: 'Estudios Médicos',
          url: './estudios-medicos',
          icon: '',
          hidden: false
        }
      ]
    },
    {
      title: 'Mascotas',
      url: './mascotas',
      icon: 'paw-outline',
      hidden: false,
      childs: [
        {
          title: 'Información general',
          url: './info-mascotas',
          icon: '',
          hidden: false
        },
        {
          title: 'Vacunas',
          url: './vacunas',
          icon: '',
          hidden: false
        },
        {
          title: 'Citas al veterinario',
          url: './citas-vet',
          icon: '',
          hidden: false
        }
      ]
    },
    {
      title: 'Estadísticas',
      url: './estadisticas',
      icon: 'bar-chart-outline',
      hidden: false
    },
    {
      title: 'Configuración',
      url: './configuracion',
      icon: 'options-outline',
      hidden: false
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

  toggleSubmenu(index: number) {
    this.subMenuOpen[index] = !this.subMenuOpen[index] || false;
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
    this.applyMenuVisibility();

    // Escuchar cambios en la configuración del menú
    window.addEventListener('menuConfigUpdated', () => {
      this.applyMenuVisibility();
    });
    return;
  }

  // Abre y cierra el menú lateral
  toggleMenu() {
    this.menu.toggle();
  }

  applyMenuVisibility() {
    const savedConfig = localStorage.getItem('menuVisibility');
    if (savedConfig) {
      const visibilityConfig = JSON.parse(savedConfig);
      this.pages = this.pages.map(page => ({
        ...page,
        hidden: !visibilityConfig.find((c: any) => c.title === page.title)?.visible
      }));
    }
  }
}
