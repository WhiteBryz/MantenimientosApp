import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudios-medicos',
  templateUrl: './estudios-medicos.page.html',
  styleUrls: ['./estudios-medicos.page.scss'],
})
export class EstudiosMedicosPage {
  tipoEstudios: string[] = ["Análisis", "Radiografías", "Tomografía", "Ecografías", "Biometría"];

  valorTipo = '';
  valorFecha: Date | null = null;
  valorFechaProximaCita: Date | null = null;
  valorAlerta = '';

  isModalOpen: boolean = false;
  actualizarBoton: boolean = false;
  mostrarBoton: boolean = true;

  estudios: {
    id: number,
    tipo: string,
    fecha: Date,
    fechaProximaCita: Date | null
  }[] = [];

  posicion: number = 0;

  constructor() { 
    let estudiosLocal = localStorage.getItem('estudios');
    if (estudiosLocal) {
      console.log(JSON.parse(estudiosLocal));
      this.estudios = JSON.parse(estudiosLocal);
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
    if (confirm('¿Deseas eliminar este seguro?')) {
      this.estudios.splice(i, 1);
      localStorage.setItem('estudios', JSON.stringify(this.estudios));
    }
  }

  Agregar() {
    if (this.valorTipo && this.valorFecha) {
      this.estudios.push({
        id: Date.now(),
        tipo: this.valorTipo,
        fecha: this.valorFecha,
        fechaProximaCita: (this.valorFechaProximaCita || null)
      });
      localStorage.setItem('estudios', JSON.stringify(this.estudios));
      this.closeModal();
    } else {
      alert('Por favor, completa los campos requeridos');
    }
  }

  Actualizar() {
    if (this.valorTipo && this.valorFecha && this.valorFechaProximaCita) {
      this.estudios[this.posicion] = {
        id: this.estudios[this.posicion].id,
        tipo: this.valorTipo,
        fecha: this.valorFecha,
        fechaProximaCita: this.valorFechaProximaCita
      };

      localStorage.setItem('estudios', JSON.stringify(this.estudios));
      this.closeModal();
    }
  }

  Cancelar() {
    this.closeModal();
  }

  Editar(i: number) {
    this.posicion = i;
    this.valorTipo = this.estudios[i].tipo;
    this.valorFecha = this.estudios[i].fecha;
    this.valorFechaProximaCita = this.estudios[i].fechaProximaCita;

    this.mostrarBoton = false;
    this.actualizarBoton = true;
    this.openModal();
  }

  private resetForm() {
    this.valorTipo = '';
    this.valorFecha = null;
    this.valorFechaProximaCita = null;
  }
}
