import { Component } from '@angular/core';

@Component({
  selector: 'app-hogar',
  templateUrl: './hogar.page.html',
  styleUrls: ['./hogar.page.scss'],
})
export class HogarPage {
  valorDescripcion = '';
  valorFechaHora = '';
  valorFrecuencia = '';
  valorEstado = '';
  valorNotas = '';
  archivos: string[] = [];

  mostrarBoton: boolean = true;
  actualizarBoton: boolean = false;
  isModalOpen: boolean = false;

  tareas: {
    id: number;
    descripcion: string;
    fechaHora: string;
    frecuencia: string;
    estado: string;
    notas: string;
    archivos: string[];
  }[] = [];

  posicion: number = 0;

  constructor() {
    // Obtener tareas del localStorage
    let tareasLocal = localStorage.getItem('tareas');
    if (tareasLocal) {
      this.tareas = JSON.parse(tareasLocal);
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
    if (confirm('¿Deseas eliminar esta tarea?')) {
      this.tareas.splice(i, 1);
      localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }
  }

  Agregar() {
    if (this.valorDescripcion && this.valorFechaHora && this.valorFrecuencia && this.valorEstado) {
      this.tareas.push({
        id: Date.now(),
        descripcion: this.valorDescripcion,
        fechaHora: this.valorFechaHora,
        frecuencia: this.valorFrecuencia,
        estado: this.valorEstado,
        notas: this.valorNotas || 'Sin notas',
        archivos: this.archivos,
      });

      localStorage.setItem('tareas', JSON.stringify(this.tareas));
      this.closeModal();
    } else {
      alert('Por favor, completa los campos requeridos');
    }
  }

  Actualizar() {
    if (this.valorDescripcion && this.valorFechaHora && this.valorFrecuencia && this.valorEstado) {
      this.tareas[this.posicion] = {
        id: this.tareas[this.posicion].id,
        descripcion: this.valorDescripcion,
        fechaHora: this.valorFechaHora,
        frecuencia: this.valorFrecuencia,
        estado: this.valorEstado,
        notas: this.valorNotas || 'Sin notas',
        archivos: this.archivos,
      };

      localStorage.setItem('tareas', JSON.stringify(this.tareas));
      this.closeModal();
    }
  }

  Cancelar() {
    this.closeModal();
  }

  Editar(i: number) {
    this.posicion = i;
    this.valorDescripcion = this.tareas[i].descripcion;
    this.valorFechaHora = this.tareas[i].fechaHora;
    this.valorFrecuencia = this.tareas[i].frecuencia;
    this.valorEstado = this.tareas[i].estado;
    this.valorNotas = this.tareas[i].notas;
    this.archivos = this.tareas[i].archivos;

    this.mostrarBoton = false;
    this.actualizarBoton = true;
    this.openModal();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.archivos.push(base64String);
      };
      reader.readAsDataURL(file);
    }
  }

  private resetForm() {
    this.valorDescripcion = '';
    this.valorFechaHora = '';
    this.valorFrecuencia = '';
    this.valorEstado = '';
    this.valorNotas = '';
    this.archivos = [];
    this.mostrarBoton = true;
    this.actualizarBoton = false;
  }
}
