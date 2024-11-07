import { Component} from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.page.html',
  styleUrls: ['./vacunas.page.scss'],
})
export class VacunasPage {
  valorNombreMasc = '';
  valorTipo = '';
  valorFecha: Date | null = null;
  valorAlerta: boolean = false;

  mostrarBoton: boolean = true;
  actualizarBoton: boolean = false;
  isModalOpen: boolean = false;

  vacunas:{
    id: number;
    idMascota: number,
    nombreMasc: string,
    tipo: string,
    fecha: Date,
    alerta: boolean
  }[] = [];

  posicion: number = 0;

  constructor() { 
    // Obtener vacunas del localStorage
    let vacunasLocal = localStorage.getItem('vacunas');
    if (vacunasLocal) {
      this.vacunas = JSON.parse(vacunasLocal);
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
      await this.cancelNotification(this.vacunas[i].id);

      this.vacunas.splice(i, 1);
      localStorage.setItem('info', JSON.stringify(this.vacunas));
    }
  }

  async Agregar(){
    if (this.valorNombreMasc && this.valorTipo && this.valorFecha && this.valorAlerta !== null) {
      const id = Math.abs(parseInt((Date.now() % 2147483647).toString()));
      this.vacunas.push({
        id: this.vacunas.length + 1,
        idMascota: this.posicion,
        nombreMasc: this.valorNombreMasc,
        tipo: this.valorTipo,
        fecha: this.valorFecha,
        alerta: this.valorAlerta
      });

      await this.scheduleNotifications(this.valorFecha, this.valorNombreMasc, `Vacuna agendada para ${this.valorNombreMasc}`, id);
      localStorage.setItem('vacunas', JSON.stringify(this.vacunas));
      this.closeModal();
    }
    else{
      alert('Por favor, completa los campos requeridos');
    }
  }

  async Actualizar(){
    if(this.valorNombreMasc && this.valorTipo && this.valorFecha && this.valorAlerta){
      await this.cancelNotification(this.vacunas[this.posicion].id);

      this.vacunas[this.posicion] = {
        id: this.vacunas[this.posicion].id,
        idMascota: this.posicion,
        nombreMasc: this.valorNombreMasc,
        tipo: this.valorTipo,
        fecha: this.valorFecha,
        alerta: this.valorAlerta
      };

      await this.scheduleNotifications(this.valorFecha, this.valorNombreMasc, `Vacuna agendada para ${this.valorNombreMasc}`, this.vacunas[this.posicion].id);
      localStorage.setItem('vacunas', JSON.stringify(this.vacunas));
      this.closeModal();
      }
    }

  Cancelar(){
    this.closeModal();
  }

  Editar(i: number){
    this.posicion = i;
    this.valorNombreMasc = this.vacunas[i].nombreMasc;
    this.valorTipo = this.vacunas[i].tipo;
    this.valorFecha = this.vacunas[i].fecha;
    this.valorAlerta = this.vacunas[i].alerta;

    this.mostrarBoton = false;
    this.actualizarBoton = true;
    this.openModal();
    }

  resetForm(){
    this.valorNombreMasc = '';
    this.valorTipo = '';
    this.valorFecha = null;
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
