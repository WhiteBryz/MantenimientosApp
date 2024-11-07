import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-estudios-medicos',
  templateUrl: './estudios-medicos.page.html',
  styleUrls: ['./estudios-medicos.page.scss'],
})
export class EstudiosMedicosPage {
  tipoEstudios: string[] = ["Análisis", "Radiografías", "Tomografía", "Ecografías", "Biometría"];

  valorTipo = '';
  valorFecha: Date | null = null;
  valorFechaProximaCita: Date | null = null;
  valorAlerta = '';

  isModalOpen: boolean = false;
  actualizarBoton: boolean = false;
  mostrarBoton: boolean = true;

  estudios: {
    id: number,
    tipo: string,
    fecha: Date,
    fechaProximaCita: Date | null
  }[] = [];

  posicion: number = 0;

  constructor() { 
    let estudiosLocal = localStorage.getItem('estudios');
    if (estudiosLocal) {
      this.estudios = JSON.parse(estudiosLocal);
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
    if (confirm('¿Deseas eliminar este seguro?')) {
      const id = this.estudios[i].id;
      await this.cancelNotification(id);
      if (this.estudios[i].fechaProximaCita) {
        const next_id = id + 1;
        await this.cancelNotification(next_id);
      }

      this.estudios.splice(i, 1);
      localStorage.setItem('estudios', JSON.stringify(this.estudios));
    }
  }

  async Agregar() {
    if (this.valorTipo && this.valorFecha) {
      const id = Date.now();
      this.estudios.push({
        id: id,
        tipo: this.valorTipo,
        fecha: this.valorFecha,
        fechaProximaCita: (this.valorFechaProximaCita || null)
      });
      localStorage.setItem('estudios', JSON.stringify(this.estudios));
      
      if (this.valorAlerta === "Si") {
        await this.scheduleNotifications(this.valorFecha, this.valorTipo, "Estudio agendado para este momento.", id);

        if (this.valorFechaProximaCita) {
          const next_id = id + 1;
          await this.scheduleNotifications(this.valorFechaProximaCita, this.valorTipo, "Estudio agendado para este momento.", next_id);
        }
      }

      this.closeModal();
    } else {
      alert('Por favor, completa los campos requeridos');
    }
  }

  async Actualizar() {
    if (this.valorTipo && this.valorFecha) {
      const id = this.estudios[this.posicion].id;
      await this.cancelNotification(id);
      if (this.estudios[this.posicion].fechaProximaCita) {
        const next_id = id + 1;
        await this.cancelNotification(next_id);
      }

      this.estudios[this.posicion] = {
        id: this.estudios[this.posicion].id,
        tipo: this.valorTipo,
        fecha: this.valorFecha,
        fechaProximaCita: this.valorFechaProximaCita
      };

      await this.scheduleNotifications(this.valorFecha, this.valorTipo, "Estudio agendado para este momento.", id);
      if (this.valorFechaProximaCita) {
        const next_id = id + 1;
        await this.scheduleNotifications(this.valorFecha, this.valorTipo, "Estudio agendado para este momento.", next_id);
      }

      localStorage.setItem('estudios', JSON.stringify(this.estudios));
      this.closeModal();
    }
  }

  Cancelar() {
    this.closeModal();
  }

  Editar(i: number) {
    this.posicion = i;
    this.valorTipo = this.estudios[i].tipo;
    this.valorFecha = this.estudios[i].fecha;
    this.valorFechaProximaCita = this.estudios[i].fechaProximaCita;

    this.mostrarBoton = false;
    this.actualizarBoton = true;
    this.openModal();
  }

  private resetForm() {
    this.valorTipo = '';
    this.valorFecha = null;
    this.valorFechaProximaCita = null;
  }

  async scheduleNotifications(date: Date, title: string, body: string, id: number) {
    try {
      const notificationDate = new Date(date);
      console.log(notificationDate);

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
