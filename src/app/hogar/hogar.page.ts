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

  tareas: {
    id: number;
    descripcion: string;
    fechaHora: string;
    frecuencia: string;
    estado: string;
    notas: string;
    archivos: string[]; }[] = [];

    posicion: number = 0;

  constructor() {
    // Obtener tareas del localStorage
    let tareasLocal = localStorage.getItem('tareas');
    if (tareasLocal) {
      this.tareas = JSON.parse(tareasLocal);
    }
    this.mostrarBoton = true;
    this.actualizarBoton = false;
  }

  Eliminar(i: number) {
    if (confirm("¿Deseas eliminar esta tarea?")) {
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
        notas: this.valorNotas,
        archivos: this.archivos
      });

      // Guardar tareas en localStorage
      localStorage.setItem('tareas', JSON.stringify(this.tareas));

      alert('Tarea agregada con éxito');

      // Limpiar campos después de agregar la tarea
      this.valorDescripcion = '';
      this.valorFechaHora = '';
      this.valorFrecuencia = '';
      this.valorEstado = '';
      this.valorNotas = '';
      this.archivos = [];
    }
    else {
      alert('Por favor, completa los campos requeridos');
    }
  }

  Actualizar(){
    if (this.valorDescripcion && this.valorFechaHora && this.valorFrecuencia && this.valorEstado) {
      this.tareas[this.posicion].descripcion = this.valorDescripcion;
      this.tareas[this.posicion].fechaHora = this.valorFechaHora;
      this.tareas[this.posicion].frecuencia = this.valorFrecuencia;
      this.tareas[this.posicion].estado = this.valorEstado;
      this.tareas[this.posicion].notas = this.valorNotas;
      this.tareas[this.posicion].archivos = this.archivos;

      this.mostrarBoton = true;
      this.actualizarBoton = false;

      // Guardar tareas en localStorage
      localStorage.setItem('tareas', JSON.stringify(this.tareas));

      alert('Tarea actualizada con éxito');

      // Limpiar campos después de agregar la tarea
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

  Cancelar() {
    this.mostrarBoton = true;
    this.actualizarBoton = false;

    this.valorDescripcion = '';
    this.valorFechaHora = '';
    this.valorFrecuencia = '';
    this.valorEstado = '';
    this.valorNotas = '';
    this.archivos = [];
  }

  Editar(i: number) {
    this.mostrarBoton = false;
    this.actualizarBoton = true;

    this.posicion = i;

    this.valorDescripcion = this.tareas[i].descripcion;
    this.valorFechaHora = this.tareas[i].fechaHora;
    this.valorFrecuencia = this.tareas[i].frecuencia;
    this.valorEstado = this.tareas[i].estado;
    this.valorNotas = this.tareas[i].notas;
    this.archivos = this.tareas[i].archivos;
    }


    // Método para almacenar y mostrar un archivo
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
}
