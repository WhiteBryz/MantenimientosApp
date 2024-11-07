import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-seguros-salud',
  templateUrl: './seguros-salud.page.html',
  styleUrls: ['./seguros-salud.page.scss'],
})
export class SegurosSaludPage {
  valorTipoSeguro = '';
  valorFechaInicio: Date | null = null;
  valorFechaVenc: Date | null = null;
  valorProveedor = '';
  valorNotas = '';
  valorAlerta: boolean = false;

  mostrarBoton: boolean = true;
  actualizarBoton: boolean = false;
  isModalOpen: boolean = false;

  seguros: {
    id: number;
    tipoSeguro: string,
    fechaInicio: Date,
    fechaVencimiento: Date,
    proveedor: string,
    notas: string,
    alerta: boolean,
  }[] = [];

  posicion: number = 0;

  constructor() {
    // Obtener seguros del localStorage
    let segurosLocal = localStorage.getItem('seguros');
    if (segurosLocal) {
      this.seguros = JSON.parse(segurosLocal);
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
    if (confirm('¿Estás seguro de eliminar este seguro?')){
      const id = this.seguros[i].id;
      const next_id = id + 1;

      if (this.seguros[i].alerta) {
        await this.cancelNotification(id);
        await this.cancelNotification(next_id);
      }

      this.seguros.splice(i, 1);
      localStorage.setItem('seguros', JSON.stringify(this.seguros));
    }
  }

  async Agregar(){
    if(this.valorTipoSeguro && this.valorFechaInicio && this.valorFechaVenc && this.valorProveedor && this.valorAlerta){
      const id = Math.abs(parseInt((Date.now() % 2147483647).toString()));
      const next_id = id + 1;

      this.seguros.push({
        id: id,
        tipoSeguro: this.valorTipoSeguro,
        fechaInicio: this.valorFechaInicio,
        fechaVencimiento: this.valorFechaVenc,
        proveedor: this.valorProveedor,
        notas: this.valorNotas || 'Sin notas',
        alerta: this.valorAlerta,
      });
      localStorage.setItem('seguros', JSON.stringify(this.seguros));

      if (this.valorAlerta) {
        await this.scheduleNotifications(this.valorFechaInicio, this.valorTipoSeguro, "Está comenzando un nuevo seguro.", id);
        await this.scheduleNotifications(this.valorFechaVenc, this.valorTipoSeguro, "Acaba de finalizar el seguro.", next_id);
      }

      this.closeModal();
    }
    else{
      alert('Por favor, completa los campos requeridos');
    }
  }

  async Actualizar(){
    if (this.valorTipoSeguro && this.valorFechaInicio && this.valorFechaVenc && this.valorProveedor && this.valorAlerta) {
      const id = this.seguros[this.posicion].id;
      const next_id = id + 1;

      if (this.seguros[this.posicion].alerta) {
        await this.cancelNotification(id);
        await this.cancelNotification(next_id);
      }

      this.seguros[this.posicion] = {
        id: this.seguros[this.posicion].id,
        tipoSeguro: this.valorTipoSeguro,
        fechaInicio: this.valorFechaInicio,
        fechaVencimiento: this.valorFechaVenc,
        proveedor: this.valorProveedor,
        notas: this.valorNotas || 'Sin notas',
        alerta: this.valorAlerta,
      };
      localStorage.setItem('seguros', JSON.stringify(this.seguros));

      if (this.valorAlerta) {
        await this.scheduleNotifications(this.valorFechaInicio, this.valorTipoSeguro, "Está comenzando un nuevo seguro.", id);
        await this.scheduleNotifications(this.valorFechaVenc, this.valorTipoSeguro, "Acaba de finalizar el seguro.", next_id);
      }

      this.closeModal();
      }
   }
  
  Cancelar(){
    this.closeModal();
  }

  Editar(i:number){
    console.log("Entré");
    this.posicion = i;
    this.valorTipoSeguro = this.seguros[i].tipoSeguro;
    this.valorFechaInicio = this.seguros[i].fechaInicio;
    this.valorFechaVenc = this.seguros[i].fechaVencimiento;
    this.valorProveedor = this.seguros[i].proveedor;
    this.valorNotas = this.seguros[i].notas;
    this.valorAlerta = this.seguros[i].alerta;

    this.mostrarBoton = false;
    this.actualizarBoton = true;
    this.openModal();
  }

  resetForm() {
    this.valorTipoSeguro = '';
    this.valorFechaInicio = null;
    this.valorFechaVenc = null;
    this.valorProveedor = '';
    this.valorNotas = '';
    this.valorAlerta = false;
  }

  async scheduleNotifications(date: Date, title: string, body: string, id: number) {
    try {
      const notificationDate = new Date(date);
      notificationDate.setHours(0, 0, 0, 0);

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
