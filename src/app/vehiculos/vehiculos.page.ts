import { Component} from '@angular/core';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage {
  valorDescripcion = '';
  valorFechaHora = '';
  valorFechaProx = '';
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
    fechaHora: string,
    fechaProx: string,
    kilometraje: number,
    costo: number,
    notas: string,
    alerta: boolean,
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

  Eliminar(i: number) {
    if (confirm('¿Deseas eliminar este mantenimiento?')) {
      this.mantenimientos.splice(i, 1);
      localStorage.setItem('mantenimientos', JSON.stringify(this.mantenimientos));
    }
  }

  Agregar(){
    if (this.valorDescripcion && this.valorFechaHora && this.valorFechaProx && this.valorKilometraje && this.valorCosto && this.valorAlerta) {
      this.mantenimientos.push({
        id: Date.now(),
        descripcion: this.valorDescripcion,
        fechaHora: this.valorFechaHora,
        fechaProx: this.valorFechaProx,
        kilometraje: parseInt(this.valorKilometraje),
        costo: parseInt(this.valorCosto),
        notas: this.valorNotas || 'Sin notas',
        alerta: this.valorAlerta
      });
      localStorage.setItem('mantenimientos', JSON.stringify(this.mantenimientos));
      this.closeModal();
    }
    else{
      alert('Por favor, completa los campos requeridos');
    }
  }

  Actualizar(){
    if (this.valorDescripcion && this.valorFechaHora && this.valorFechaProx && this.valorKilometraje && this.valorCosto && this.valorAlerta) {
      this.mantenimientos[this.posicion] = {
        id: this.mantenimientos[this.posicion].id,
        descripcion: this.valorDescripcion,
        fechaHora: this.valorFechaHora,
        fechaProx: this.valorFechaProx,
        kilometraje: parseInt(this.valorKilometraje),
        costo: parseInt(this.valorCosto),
        notas: this.valorNotas || 'Sin notas',
        alerta: this.valorAlerta
      };

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
    this.valorAlerta = this.mantenimientos[i].alerta;

    this.mostrarBoton = false;
    this.actualizarBoton = true;
    this.openModal();
  }

  private resetForm() {
    this.valorDescripcion = '';
    this.valorFechaHora = '';
    this.valorFechaProx = '';
    this.valorKilometraje = '';
    this.valorCosto = '';
    this.valorNotas = '';
    this.valorAlerta = false;
  }
}
