import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  txtUserName: string = "";
  txtPassword: string = "";
  cbRememberMe: boolean = false;
  showPassword: boolean = false;

  // Datos pendientes de confirmar
  usuarios: {
    id: number,
    fullName: string,
    userName: string,
    password: string
  }[] = [];

  constructor(public navCtrl: NavController) {
    const savedUserName = localStorage.getItem("savedUser");
    if (savedUserName) {
      const user = JSON.parse(savedUserName);
      this.txtUserName = user.userName;
      this.txtPassword = user.password;
    }
  }

  login() {
    const user = this.usuarios.find((e) => e.userName == this.txtUserName.toLowerCase())
    if (!!user) {
      if (user.password === this.txtPassword) {
        if (this.cbRememberMe) {
          localStorage.setItem("savedUser", JSON.stringify(user));
        }
        // Almacenar datos del usuario local
        localStorage.setItem("usuarioActual", JSON.stringify(user));
        this.navigateToHomePage();
      }
    } else {
      alert("Usuario o contraseña inválidos.")
    }
  }
  showingPassword() {
    this.showPassword = !this.showPassword;
  }
  navigateToHomePage() {
    this.navCtrl.navigateRoot("menu-lateral/home");
  }
  ngOnInit() {
    let usuariosLocal = localStorage.getItem("usuarios");
    if (usuariosLocal) {
      this.usuarios = JSON.parse(usuariosLocal)
    }
  }

}
