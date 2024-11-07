import { Component} from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage {
  valorDescripcion = '';
  valorFechaHora: Date | null = null;
  valorFechaProx: Date | null = null;
  valorKilometraje = '';
  valorCosto = '';
  valorNotas = '';
  valorAlerta: boolean = false;

  mostrarBoton: boolean = true;
  actualizarBoton: boolean = false;
  isModalOpen: boolean = false;

  mantenimientos: {
    id: number;
    descripcion: string,
    fechaHora: Date,
    fechaProx: Date,
    kilometraje: number,
    costo: number,
    notas: string,
    alerta: boolean
  }[] = [];

  posicion: number = 0;

  constructor() {
    // Obtener mantenimientos del localStorage
    let mantenimientosLocal = localStorage.getItem('mantenimientos');
    if (mantenimientosLocal) {
      this.mantenimientos = JSON.parse(mantenimientosLocal);
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  async Eliminar(i: number) {
    if (confirm('¿Deseas eliminar este mantenimiento?')) {
      const id = this.mantenimientos[i].id;
      const next_id = id + 1;

      if (this.mantenimientos[i].alerta) {
        await this.cancelNotification(id);
        await this.cancelNotification(next_id);
      }

      this.mantenimientos.splice(i, 1);
      localStorage.setItem('mantenimientos', JSON.stringify(this.mantenimientos));
    }
  }

  async Agregar(){
    if (this.valorDescripcion && this.valorFechaHora && this.valorFechaProx && this.valorKilometraje && this.valorCosto && this.valorAlerta) {
      const id = Math.abs(parseInt((Date.now() % 2147483647).toString()));
      const next_id = id + 1;

      const fechaProxima = new Date(this.valorFechaProx);
      fechaProxima.setHours(0, 0, 0, 0);

      this.mantenimientos.push({
        id: id,
        descripcion: this.valorDescripcion,
        fechaHora: this.valorFechaHora,
        fechaProx: fechaProxima,
        kilometraje: parseInt(this.valorKilometraje),
        costo: parseInt(this.valorCosto),
        notas: this.valorNotas || 'Sin notas',
        alerta: this.valorAlerta
      });

      if (this.valorAlerta) {
        await this.scheduleNotifications(this.valorFechaHora, "Mantenimiento de Vehículo", this.valorDescripcion, id);
        await this.scheduleNotifications(fechaProxima, "Mantenimiento de Vehículo", this.valorDescripcion, next_id);
      }

      localStorage.setItem('mantenimientos', JSON.stringify(this.mantenimientos));
      this.closeModal();
    }
    else{
      alert('Por favor, completa los campos requeridos');
    }
  }

  async Actualizar(){
    if (this.valorDescripcion && this.valorFechaHora && this.valorFechaProx && this.valorKilometraje && this.valorCosto && this.valorAlerta) {
      const id = this.mantenimientos[this.posicion].id;
      const next_id = id + 1;

      if (this.mantenimientos[this.posicion].alerta) {
        await this.cancelNotification(id);
        await this.cancelNotification(next_id);
      }

      const fechaProxima = new Date(this.valorFechaProx);
      fechaProxima.setHours(0, 0, 0, 0);

      this.mantenimientos[this.posicion] = {
        id: id,
        descripcion: this.valorDescripcion,
        fechaHora: this.valorFechaHora,
        fechaProx: fechaProxima,
        kilometraje: parseInt(this.valorKilometraje),
        costo: parseInt(this.valorCosto),
        notas: this.valorNotas || 'Sin notas',
        alerta: this.valorAlerta
      };

      if (this.valorAlerta) {
        await this.scheduleNotifications(this.valorFechaHora, "Mantenimiento de Vehículo", this.valorDescripcion, id);
        await this.scheduleNotifications(fechaProxima, "Mantenimiento de Vehículo", this.valorDescripcion, next_id);
      }

      localStorage.setItem('mantenimientos', JSON.stringify(this.mantenimientos));
      this.closeModal();
    }
  }

  Cancelar(){
    this.closeModal();
  }

  Editar(i: number){
    this.posicion = i;
    this.valorDescripcion = this.mantenimientos[i].descripcion;
    this.valorFechaHora = this.mantenimientos[i].fechaHora;
    this.valorFechaProx = this.mantenimientos[i].fechaProx;
    this.valorKilometraje = this.mantenimientos[i].kilometraje.toString();
    this.valorCosto = this.mantenimientos[i].costo.toString();
    this.valorNotas = this.mantenimientos[i].notas;
    this.valorAlerta = false;

    this.mostrarBoton = false;
    this.actualizarBoton = true;
    this.openModal();
  }

  private resetForm() {
    this.valorDescripcion = '';
    this.valorFechaHora = null;
    this.valorFechaProx = null;
    this.valorKilometraje = '';
    this.valorCosto = '';
    this.valorNotas = '';
    this.valorAlerta = false;
  }

  async scheduleNotifications(date: Date, title: string, body: string, id: number) {
    try {
      const notificationDate = new Date(date);

      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: id,
            schedule: { at: notificationDate },
            sound: "default",
            smallIcon: "ic_launcher"
          }
        ]
      });
    } catch (e) {
      alert(e);
    }
  }

  async cancelNotification(id: number) {
    try {
      await LocalNotifications.cancel({ notifications: [{ id: id }] });
    } catch (e) {
      alert(e);
    }
  }
}
