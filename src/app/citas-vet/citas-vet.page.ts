import { Component} from '@angular/core';

@Component({
  selector: 'app-citas-vet',
  templateUrl: './citas-vet.page.html',
  styleUrls: ['./citas-vet.page.scss'],
})
export class CitasVetPage{
  valorNombreMasc = '';
  valorFecha = '';
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
    fecha: string,
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

  Eliminar(i: number) {
    if (confirm('¿Estás seguro de eliminar esta cita?')){
    this.citas.splice(i, 1);
    localStorage.setItem('citas', JSON.stringify(this.citas));
    }
  }

  Agregar(){
    if (this.valorNombreMasc && this.valorFecha && this.valorMotivo && this.valorResultado && this.valorAlerta) {
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
      localStorage.setItem('citas', JSON.stringify(this.citas));
      this.closeModal();
    }
    else{
      alert('Por favor, completa los campos requeridos');
    }
  }

  Actualizar(){
    if(this.valorNombreMasc && this.valorFecha && this.valorMotivo && this.valorResultado && this.valorAlerta !== null){
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
    this.valorFecha = '';
    this.valorMotivo = '';
    this.valorResultado = '';
    this.valorNotas = '';
    this.valorAlerta = false;
  }
}
