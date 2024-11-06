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
    if(this.valorTipoSeguro && this.valorFechaInicio && this.valorFechaVenc && this.valorProveedor && this.valorAlerta){
      this.seguros.push({
        id: Date.now(),
        tipoSeguro: this.valorTipoSeguro,
        fechaInicio: this.valorFechaInicio,
        fechaVencimiento: this.valorFechaVenc,
        proveedor: this.valorProveedor,
        notas: this.valorNotas || 'Sin notas',
        alerta: this.valorAlerta,
      });
      localStorage.setItem('seguros', JSON.stringify(this.seguros));
      this.closeModal();
      }
      else{
        alert('Por favor, completa los campos requeridos');
      }
  }

  Actualizar(){
    if (this.valorTipoSeguro && this.valorFechaInicio && this.valorFechaVenc && this.valorProveedor && this.valorAlerta) {
      this.seguros[this.posicion] = {
        id: Date.now(),
        tipoSeguro: this.valorTipoSeguro,
        fechaInicio: this.valorFechaInicio,
        fechaVencimiento: this.valorFechaVenc,
        proveedor: this.valorProveedor,
        notas: this.valorNotas || 'Sin notas',
        alerta: this.valorAlerta,
      };
      localStorage.setItem('seguros', JSON.stringify(this.seguros));
      this.closeModal();
      }
   }
  
  Cancelar(){
    this.closeModal();
  }

  Editar(i:number){
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
    this.valorFechaInicio = '';
    this.valorFechaVenc = '';
    this.valorProveedor = '';
    this.valorNotas = '';
    this.valorAlerta = false;
  }
}
