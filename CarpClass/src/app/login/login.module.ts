import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module'; // Asegúrate de que este archivo existe
import { LoginPage } from './login.page';
import { RouterModule } from '@angular/router'; // Importa RouterModule aquí

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    RouterModule // Asegúrate de agregar esto
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
