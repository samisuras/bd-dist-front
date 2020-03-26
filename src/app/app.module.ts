import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { EstudianteComponent } from './components/usuarios/estudiante/estudiante.component';
import { MaestroComponent } from './components/usuarios/maestro/maestro.component';
import { LaboratoristaComponent } from './components/usuarios/laboratorista/laboratorista.component';
import { HomeComponent } from './components/home/home.component';
import { PracticaComponent } from './components/usuarios/maestro/practica/practica.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    EstudianteComponent,
    MaestroComponent,
    LaboratoristaComponent,
    HomeComponent,
    PracticaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
