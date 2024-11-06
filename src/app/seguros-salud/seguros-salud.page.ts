import { Component } from '@angular/core';

@Component({
  selector: 'app-seguros-salud',
  templateUrl: './seguros-salud.page.html',
  styleUrls: ['./seguros-salud.page.scss'],
})
export class SegurosSaludPage {
  valorTipoSeguro = '';
  valorFechaInicio = '';
  valorFechaVenc = '';
  valorProveedor = '';
  valorNotas = '';
  valorAlerta: boolean = false;

  mostrarBoton: boolean = true;
  actualizarBoton: boolean = false;
  isModalOpen: boolean = false;

  seguros: {
    id: number;
    tipoSeguro: string,
    fechaInicio: string,
    fechaVencimiento: string,
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

  Eliminar(i: number) {
    if (confirm('¿Estás seguro de eliminar este seguro?')){
    this.seguros.splice(i, 1);
    localStorage.setItem('seguros', JSON.stringify(this.seguros));
    }
  }

  Agregar(){

  }

  Actualizar(){

  }

  Cancelar(){
    this.closeModal();
  }

  Editar(i:number){

  }

  resetForm() {
    this.valorTipoSeguro = '';
    this.valorFechaInicio = '';
    this.valorFechaVenc = '';
    this.valorProveedor = '';
    this.valorNotas = '';
    this.valorAlerta = false;
  }

}
