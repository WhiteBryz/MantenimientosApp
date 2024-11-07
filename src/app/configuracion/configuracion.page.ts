import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  template: `
    <app-custom-header pageTitle="Configuración"></app-custom-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item button (click)="openCuentaModal()">
          <ion-icon slot="start" name="person-outline"></ion-icon>
          <ion-label>
            <h2>Cuenta</h2>
            <p>Gestiona tu información personal</p>
          </ion-label>
          <ion-icon slot="end" name="chevron-forward-outline"></ion-icon>
        </ion-item>

        <ion-item button (click)="openEstiloModal()">
          <ion-icon slot="start" name="color-palette-outline"></ion-icon>
          <ion-label>
            <h2>Estilo</h2>
            <p>Personaliza la apariencia de la aplicación</p>
          </ion-label>
          <ion-icon slot="end" name="chevron-forward-outline"></ion-icon>
        </ion-item>

        <ion-item button (click)="openMenuVisibilityModal()">
          <ion-icon slot="start" name="eye-outline"></ion-icon>
          <ion-label>
            <h2>Visibilidad del menú</h2>
            <p>Configura qué categorías mostrar en el menú</p>
          </ion-label>
          <ion-icon slot="end" name="chevron-forward-outline"></ion-icon>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
export class ConfiguracionPage implements OnInit {
  darkMode: boolean = false;

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private modalController: ModalController
  ) {
    this.checkCurrentTheme();
  }

  ngOnInit() {
    if (!localStorage.getItem('theme')) {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  checkCurrentTheme() {
    const theme = localStorage.getItem('theme');
    this.darkMode = theme === 'dark';
    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  async openCuentaModal() {
    const modal = await this.modalController.create({
      component: CuentaModalComponent,
      componentProps: {
        currentUser: this.authService.currentUserValue
      }
    });
    return await modal.present();
  }

  async openEstiloModal() {
    const modal = await this.modalController.create({
      component: EstiloModalComponent,
      componentProps: {
        darkMode: this.darkMode
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.checkCurrentTheme();
      }
    });

    return await modal.present();
  }
  async openMenuVisibilityModal() {
    const modal = await this.modalController.create({
      component: MenuVisibilityModalComponent
    });
    return await modal.present();
  }
}

@Component({
  selector: 'app-cuenta-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Cuenta</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <form [formGroup]="settingsForm" (ngSubmit)="onSubmit()">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Nombre completo</ion-label>
            <ion-input formControlName="fullName" type="text"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Nombre de usuario</ion-label>
            <ion-input formControlName="username" type="text"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Nueva contraseña (opcional)</ion-label>
            <ion-input formControlName="password" type="password"></ion-input>
          </ion-item>

          <div class="validation-errors">
            <ng-container *ngIf="settingsForm.get('fullName')?.hasError('required') && 
                        settingsForm.get('fullName')?.touched">
              <ion-text color="danger">
                <p>El nombre completo es requerido</p>
              </ion-text>
            </ng-container>

            <ng-container *ngIf="settingsForm.get('username')?.hasError('required') && 
                        settingsForm.get('username')?.touched">
              <ion-text color="danger">
                <p>El nombre de usuario es requerido</p>
              </ion-text>
            </ng-container>
          </div>
        </ion-list>

        <div class="ion-padding">
          <ion-button expand="block" type="submit" [disabled]="!settingsForm.valid">
            Guardar cambios
          </ion-button>
        </div>
      </form>
    </ion-content>
  `
})
export class CuentaModalComponent implements OnInit {
  settingsForm: FormGroup;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.settingsForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['']
    });
  }

  ngOnInit() {
    if (this.currentUser) {
      this.settingsForm.patchValue({
        fullName: this.currentUser.fullName,
        username: this.currentUser.username
      });
    }
  }

  async onSubmit() {
    if (this.settingsForm.valid) {
      const updateData: any = {
        fullName: this.settingsForm.value.fullName,
        username: this.settingsForm.value.username
      };

      if (this.settingsForm.value.password) {
        updateData.password = this.settingsForm.value.password;
      }

      if (this.authService.updateUser(updateData)) {
        const toast = await this.toastController.create({
          message: 'Datos actualizados exitosamente',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.dismiss();
      } else {
        const toast = await this.toastController.create({
          message: 'Error al actualizar los datos. El nombre de usuario podría estar en uso.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

@Component({
  selector: 'app-estilo-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Estilo</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-icon slot="start" name="moon-outline"></ion-icon>
          <ion-label>Modo oscuro</ion-label>
          <ion-toggle [(ngModel)]="darkMode" (ionChange)="toggleTheme()"></ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
export class EstiloModalComponent {
  darkMode: boolean = false;

  constructor(private modalController: ModalController) {
    const theme = localStorage.getItem('theme');
    this.darkMode = theme === 'dark';
  }

  toggleTheme() {
    if (this.darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    // Forzar actualización de los componentes de Ionic
    document.body.style.transition = 'background-color 300ms ease-in-out';
  }

  dismiss() {
    this.modalController.dismiss({
      themeChanged: true
    });
  }
}

@Component({
  selector: 'app-menu-visibility-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Visibilidad del menú</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item *ngFor="let category of menuCategories">
          <ion-label>{{category.title}}</ion-label>
          <ion-checkbox 
            [(ngModel)]="category.visible" 
            (ionChange)="updateVisibility()"
          ></ion-checkbox>
        </ion-item>
      </ion-list>

      <div class="ion-padding">
        <ion-button expand="block" (click)="restoreDefaults()">
          Restaurar valores predeterminados
        </ion-button>
      </div>
    </ion-content>
  `
})

export class MenuVisibilityModalComponent implements OnInit {
  menuCategories: any[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // Cargar configuración guardada o usar valores predeterminados
    const savedConfig = localStorage.getItem('menuVisibility');
    if (savedConfig) {
      this.menuCategories = JSON.parse(savedConfig);
    } else {
      // Usar la misma estructura de pages pero agregando la propiedad visible
      this.menuCategories = [
        { title: 'Inicio', visible: true },
        { title: 'Hogar', visible: true },
        { title: 'Vehículos', visible: true },
        { title: 'Salud personal', visible: true },
        { title: 'Mascotas', visible: true },
        { title: 'Estadísticas', visible: true },
        { title: 'Configuración', visible: true }
      ];
    }
  }

  async updateVisibility() {
    localStorage.setItem('menuVisibility', JSON.stringify(this.menuCategories));
    const toast = await this.toastController.create({
      message: 'Configuración guardada',
      duration: 2000,
      color: 'success'
    });
    toast.present();
    // Emitir evento para actualizar el menú
    window.dispatchEvent(new CustomEvent('menuConfigUpdated'));
  }

  async restoreDefaults() {
    this.menuCategories.forEach(category => category.visible = true);
    this.updateVisibility();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}