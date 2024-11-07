import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  // Categoría seleccionada
  selectedCategory: string = 'all';

  // Lista filtrada
  filteredTasks: any[] = [];

  // Lista combinada de todas las tareas
  allTasks: any[] = [];


  constructor() { }

  ngOnInit(): void {
    this.cargarTareas();
    console.log(this.allTasks);
  }

  // Filtrar las tareas según la categoría seleccionada
  filtrarTareas() {
    if (this.selectedCategory === 'all') {
      this.filteredTasks = this.allTasks; // Mostrar todas las tareas
    } else {
      this.filteredTasks = this.allTasks.filter(task => task.categoria === this.selectedCategory);
    }
  }

  cargarTareas() {
    // Cargar tareas del hogar
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]').map((task: any) => ({
      ...task,
      categoria: "tareasHogar"
    }));

    // Cargar mantenimientos
    const mantenimientos = JSON.parse(localStorage.getItem('mantenimientos') || '[]').map((task: any) => ({
      ...task,
      categoria: "mantenimiento"
    }));

    // Cargar seguros
    const seguros = JSON.parse(localStorage.getItem('seguros') || '[]').map((task: any) => ({
      ...task,
      categoria: "segurosSalud"
    }));

    // Cargar estudios médicos
    const estudios = JSON.parse(localStorage.getItem('estudios') || '[]').map((task: any) => ({
      ...task,
      categoria: "estudiosMedicos"
    }));

    // Cargar información de mascotas
    const vacunas = JSON.parse(localStorage.getItem('vacunas') || '[]').map((task: any) => ({
      ...task,
      categoria: "vacunas"
    }));

    // Cargar citas veterinarias
    const citasVet = JSON.parse(localStorage.getItem('citas') || '[]').map((task: any) => ({
      ...task,
      categoria: "citasVet"
    }));

    // Combinar todas las tareas en un solo arreglo
    this.allTasks = [...tareas, ...mantenimientos, ...seguros, ...estudios, ...vacunas, ...citasVet];

    this.allTasks = this.allTasks.sort((a, b) => {
      const dateA = new Date(a.fechaProximaCita || a.fechaProx || a.fechaVencimiento || a.fechaHora);
      const dateB = new Date(b.fechaProximaCita || b.fechaProx || b.fechaVencimiento || b.fechaHora);

      return dateA.getTime() - dateB.getTime();
    });

    // Ordenar las tareas por fecha más cercana
    this.filteredTasks = this.allTasks;
  };

}
