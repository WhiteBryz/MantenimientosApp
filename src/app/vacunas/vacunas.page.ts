import { Component} from '@angular/core';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.page.html',
  styleUrls: ['./vacunas.page.scss'],
})
export class VacunasPage {
  valorNombreMasc = '';
  valorTipo = '';
  valorFecha = '';
  valorAlerta: boolean = false;

  mostrarBoton: boolean = true;
  actualizarBoton: boolean = false;
  isModalOpen: boolean = false;

  vacunas:{
    id: number;
    idMascota: number,
    nombreMasc: string,
    tipo: string,
    fecha: string,
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

  Eliminar(i: number) {
    if (confirm('¿Estás seguro de eliminar este seguro?')){
    this.vacunas.splice(i, 1);
    localStorage.setItem('info', JSON.stringify(this.vacunas));
    }
  }

  Agregar(){
    if (this.valorNombreMasc && this.valorTipo && this.valorFecha && this.valorAlerta !== null) {
      this.vacunas.push({
        id: this.vacunas.length + 1,
        idMascota: this.posicion,
        nombreMasc: this.valorNombreMasc,
        tipo: this.valorTipo,
        fecha: this.valorFecha,
        alerta: this.valorAlerta
      });
      localStorage.setItem('vacunas', JSON.stringify(this.vacunas));
      this.closeModal();
    }
    else{
      alert('Por favor, completa los campos requeridos');
    }
  }

  Actualizar(){
    if(this.valorNombreMasc && this.valorTipo && this.valorFecha && this.valorAlerta){
      this.vacunas[this.posicion] = {
        id: this.vacunas[this.posicion].id,
        idMascota: this.posicion,
        nombreMasc: this.valorNombreMasc,
        tipo: this.valorTipo,
        fecha: this.valorFecha,
        alerta: this.valorAlerta
      };
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
    this.valorFecha = '';
    this.valorAlerta = false;
  }
  
}
