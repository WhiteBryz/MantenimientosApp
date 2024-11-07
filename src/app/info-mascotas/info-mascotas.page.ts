import { Component } from '@angular/core';

@Component({
  selector: 'app-info-mascotas',
  templateUrl: './info-mascotas.page.html',
  styleUrls: ['./info-mascotas.page.scss'],
})
export class InfoMascotasPage {
  valorNombre = '';
  valorTipo = '';
  valorRaza = '';

  mostrarBoton: boolean = true;
  actualizarBoton: boolean = false;
  isModalOpen: boolean = false;

  info:{
    id: number;
    nombre: string,
    tipo: string,
    raza: string,
  }[] = [];

  posicion: number = 0;

  constructor() {
    // Obtener info del localStorage
    let infoLocal = localStorage.getItem('info');
    if (infoLocal) {
      this.info = JSON.parse(infoLocal);
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
    this.info.splice(i, 1);
    localStorage.setItem('info', JSON.stringify(this.info));
    }
  }

  Agregar(){
    if(this.valorNombre && this.valorTipo && this.valorRaza){
      this.info.push({
        id: Date.now(),
        nombre: this.valorNombre,
        tipo: this.valorTipo,
        raza: this.valorRaza,
      });
      localStorage.setItem('info', JSON.stringify(this.info));
      this.closeModal();
    }
    else{
      alert('Por favor, completa los campos requeridos');
    }
  }

  Actualizar(){
    if(this.valorNombre && this.valorTipo && this.valorRaza){
     this.info[this.posicion] = {
        id: Date.now(),
        nombre: this.valorNombre,
        tipo: this.valorTipo,
        raza: this.valorRaza,
      };
      localStorage.setItem('info', JSON.stringify(this.info));
      this.closeModal();
    }  
    }

  Cancelar(){
    this.closeModal();
    }

    Editar(i: number){
      this.posicion = i;
      this.valorNombre = this.info[i].nombre;
      this.valorTipo = this.info[i].tipo;
      this.valorRaza = this.info[i].raza;

      this.mostrarBoton = false;
      this.actualizarBoton = true;
      this.openModal();
      }

  resetForm(){
    this.valorNombre = '';
    this.valorTipo = '';
    this.valorRaza = '';
  }
}
