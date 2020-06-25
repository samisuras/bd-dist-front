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
import { VerPracticasComponent } from './components/usuarios/maestro/ver-practicas/ver-practicas.component';
import { VerPracticaInidividualComponent } from './components/usuarios/maestro/ver-practicas/ver-practica-inidividual/ver-practica-inidividual.component';
import { CrearExamenComponent } from './components/usuarios/maestro/examenes/crear-examen/crear-examen.component';
import { VerExamenComponent } from './components/usuarios/maestro/examenes/ver-examen/ver-examen.component';
import { CrearPreguntasComponent } from './components/usuarios/maestro/examenes/crear-preguntas/crear-preguntas.component';
import { VerExamenIndividualComponent } from './components/usuarios/maestro/examenes/ver-examen-individual/ver-examen-individual.component';
import { MaterialesComponent } from './components/usuarios/laboratorista/materiales/materiales.component';
import { ReportesComponent } from './components/usuarios/jefe_departamento/reportes/reportes.component';
import { MateriasComponent } from './components/usuarios/estudiante/materias/materias.component';
import { VerExamenesComponent } from './components/usuarios/estudiante/ver-examenes/ver-examenes.component';
import { VerPracticaComponent } from './components/usuarios/estudiante/ver-practica/ver-practica.component';
import { RealizarExamenComponent } from './components/usuarios/estudiante/realizar-examen/realizar-examen.component';
import { PrestamosComponent } from './components/usuarios/laboratorista/prestamos/prestamos.component';
import { SubirPracticaComponent } from './components/usuarios/estudiante/subir-practica/subir-practica.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    EstudianteComponent,
    MaestroComponent,
    LaboratoristaComponent,
    HomeComponent,
    PracticaComponent,
    VerPracticasComponent,
    VerPracticaInidividualComponent,
    CrearExamenComponent,
    VerExamenComponent,
    CrearPreguntasComponent,
    VerExamenIndividualComponent,
    MaterialesComponent,
    ReportesComponent,
    MateriasComponent,
    VerExamenesComponent,
    VerPracticaComponent,
    RealizarExamenComponent,
    PrestamosComponent,
    SubirPracticaComponent
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
