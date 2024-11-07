import { Component} from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-citas-vet',
  templateUrl: './citas-vet.page.html',
  styleUrls: ['./citas-vet.page.scss'],
})
export class CitasVetPage{
  valorNombreMasc = '';
  valorFecha: Date | null = null;
  valorMotivo = '';
  valorResultado = '';
  valorNotas = '';
  valorAlerta: boolean = false;

  mostrarBoton: boolean = true;
  actualizarBoton: boolean = false;
  isModalOpen: boolean = false;

  citas:{
    id: number;
    idMascota: number,
    nombreMasc: string,
    fecha: Date,
    motivo: string,
    resultado: string,
    notas: string,
    alerta: boolean
  }[] = [];

  posicion: number = 0;

  constructor() {
    // Obtener citas del localStorage
    let citasLocal = localStorage.getItem('citas');
    if (citasLocal) {
      this.citas = JSON.parse(citasLocal);
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
    if (confirm('¿Estás seguro de eliminar esta cita?')){
      if (this.citas[i].alerta) {
        await this.cancelNotification(this.citas[i].id);
      }

      this.citas.splice(i, 1);
      localStorage.setItem('citas', JSON.stringify(this.citas));
    }
  }

  async Agregar(){
    if (this.valorNombreMasc && this.valorFecha && this.valorMotivo && this.valorResultado && this.valorAlerta) {
      const id = Math.abs(parseInt((Date.now() % 2147483647).toString()));

      this.citas.push({
        id: Date.now(),
        idMascota: this.posicion,
        nombreMasc: this.valorNombreMasc,
        fecha: this.valorFecha,
        motivo: this.valorMotivo,
        resultado: this.valorResultado,
        notas: this.valorNotas || 'Sin notas',
        alerta: this.valorAlerta
      });

      if (this.valorAlerta) {
        await this.scheduleNotifications(this.valorFecha, this.valorNombreMasc, `Cita con el veterinario para ${this.valorNombreMasc}`, id);
      }

      localStorage.setItem('citas', JSON.stringify(this.citas));
      this.closeModal();
    }
    else{
      alert('Por favor, completa los campos requeridos');
    }
  }

  async Actualizar(){
    if(this.valorNombreMasc && this.valorFecha && this.valorMotivo && this.valorResultado && this.valorAlerta !== null){
      if (this.citas[this.posicion].alerta) {
        await this.cancelNotification(this.citas[this.posicion].id);
      }

      this.citas[this.posicion] = {
        id: this.citas[this.posicion].id,
        idMascota: this.posicion,
        nombreMasc: this.valorNombreMasc,
        fecha: this.valorFecha,
        motivo: this.valorMotivo,
        resultado: this.valorResultado,
        notas: this.valorNotas || 'Sin notas',
        alerta: this.valorAlerta
      };

      if (this.valorAlerta) {
        await this.scheduleNotifications(this.valorFecha, this.valorNombreMasc, `Cita con el veterinario para ${this.valorNombreMasc}`, this.citas[this.posicion].id);
      }

      localStorage.setItem('citas', JSON.stringify(this.citas));
      this.closeModal();
    }
  }

  Cancelar(){
    this.closeModal();
  }

  Editar(i: number){
    this.posicion = i;
    this.valorNombreMasc = this.citas[i].nombreMasc;
    this.valorFecha = this.citas[i].fecha;
    this.valorMotivo = this.citas[i].motivo;
    this.valorResultado = this.citas[i].resultado;
    this.valorNotas = this.citas[i].notas;
    this.valorAlerta = this.citas[i].alerta;

    this.mostrarBoton = false;
    this.actualizarBoton = true;
    this.openModal();
  }

  private resetForm(){
    this.valorNombreMasc = '';
    this.valorFecha = null;
    this.valorMotivo = '';
    this.valorResultado = '';
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
