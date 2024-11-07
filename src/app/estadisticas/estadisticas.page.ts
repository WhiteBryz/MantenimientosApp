import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  // Estadísticas de tareas del hogar
  tareasPendientes: number = 0;
  tareasEnProgreso: number = 0;
  tareasCompletadas: number = 0;

  // Estadísticas de mantenimiento de vehículos
  mantenimientosPasados: number = 0;
  mantenimientosFuturos: number = 0;

  // Estadísticas de seguros
  segurosVigentes: number = 0;
  segurosProximosVencer: number = 0;

  // Estadísticas de estudios médicos
  estudiosPasados: number = 0;
  estudiosProximos: number = 0;

  // Estadísticas de mascotas
  totalMascotas: number = 0;
  vacunasPendientes: number = 0;
  vacunasAplicadas: number = 0;
  citasVetPasadas: number = 0;
  citasVetFuturas: number = 0;

  constructor() { }

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    // Cargar tareas
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    this.tareasPendientes = tareas.filter((t: any) => t.estado === 'Pendiente').length;
    this.tareasEnProgreso = tareas.filter((t: any) => t.estado === 'En progreso').length;
    this.tareasCompletadas = tareas.filter((t: any) => t.estado === 'Completada').length;

    // Cargar mantenimientos
    const mantenimientos = JSON.parse(localStorage.getItem('mantenimientos') || '[]');
    const fechaActual = new Date();
    this.mantenimientosPasados = mantenimientos.filter((m: any) =>
      new Date(m.fechaHora) < fechaActual
    ).length;
    this.mantenimientosFuturos = mantenimientos.filter((m: any) =>
      new Date(m.fechaProx) > fechaActual
    ).length;

    // Cargar seguros
    const seguros = JSON.parse(localStorage.getItem('seguros') || '[]');
    this.segurosVigentes = seguros.filter((s: any) =>
      new Date(s.fechaVencimiento) > fechaActual
    ).length;
    // Próximos a vencer en los siguientes 30 días
    const treintaDias = new Date(fechaActual.getTime() + (30 * 24 * 60 * 60 * 1000));
    this.segurosProximosVencer = seguros.filter((s: any) => {
      const fechaVenc = new Date(s.fechaVencimiento);
      return fechaVenc > fechaActual && fechaVenc <= treintaDias;
    }).length;

    // Cargar estudios médicos
    const estudios = JSON.parse(localStorage.getItem('estudios') || '[]');
    this.estudiosPasados = estudios.filter((e: any) =>
      new Date(e.fecha) < fechaActual
    ).length;
    this.estudiosProximos = estudios.filter((e: any) =>
      e.fechaProximaCita && new Date(e.fechaProximaCita) > fechaActual
    ).length;

    // Cargar información de mascotas
    const mascotas = JSON.parse(localStorage.getItem('info') || '[]');
    this.totalMascotas = mascotas.length;

    // Cargar vacunas
    const vacunas = JSON.parse(localStorage.getItem('vacunas') || '[]');
    this.vacunasAplicadas = vacunas.filter((v: any) =>
      new Date(v.fecha) < fechaActual
    ).length;
    this.vacunasPendientes = vacunas.filter((v: any) =>
      new Date(v.fecha) > fechaActual
    ).length;

    // Cargar citas veterinarias
    const citasVet = JSON.parse(localStorage.getItem('citas') || '[]');
    this.citasVetPasadas = citasVet.filter((c: any) =>
      new Date(c.fecha) < fechaActual
    ).length;
    this.citasVetFuturas = citasVet.filter((c: any) =>
      new Date(c.fecha) > fechaActual
    ).length;
  }
}