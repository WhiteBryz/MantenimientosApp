import { Component} from '@angular/core';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
})
export class MascotasPage {
  //Mascota
  valorNombre = '';
  valorTipo = '';
  valorRaza = '';
  //Vacunas
  valorVacuna = '';
  valorFechaApli = '';
  //Citas
  valorFechaCita = '';
  valorMotivo = '';
  valorResultado = '';
  //Información adicional
  valorNotas = '';
  valorAlerta: boolean = false;

  mostrarBoton: boolean = true;
  actualizarBoton: boolean = false;
  isModalOpen: boolean = false;

  mascotas:{
    id: number;
    nombre: string,
    tipo: string,
    raza: string,
    vacuna: string,
    fechaApli: string,
    fechaCita: string,
    motivo: string,
    resultado: string,
    notas: string,
    alerta: boolean,
  }[] = [];

  posicion: number = 0;

  constructor() {
    // Obtener mascotas del localStorage
    let mascotasLocal = localStorage.getItem('mascotas');
    if (mascotasLocal) {
      this.mascotas = JSON.parse(mascotasLocal);
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
    if (confirm('¿Deseas eliminar esta mascota?')) {
      this.mascotas.splice(i, 1);
      localStorage.setItem('mascotas', JSON.stringify(this.mascotas));
    }
  }

  Agregar(){

  }

  Actualizar(){

  }

  Cancelar(){
    this.closeModal();
  }

  Editar(i: number) {
  }

  private resetForm() {
    this.valorNombre = '';
    this.valorTipo = '';
    this.valorRaza = '';
    this.valorVacuna = '';
    this.valorFechaApli = '';
    this.valorFechaCita = '';
    this.valorMotivo = '';
    this.valorResultado = '';
    this.valorNotas = '';
    this.valorAlerta = false;
  }
}
