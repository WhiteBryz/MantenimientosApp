import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeTheme();
  }

  initializeTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      if (theme === 'dark') {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    } else {
      // Tema claro por defecto
      localStorage.setItem('theme', 'light');
      document.body.classList.remove('dark');
    }
  }
}