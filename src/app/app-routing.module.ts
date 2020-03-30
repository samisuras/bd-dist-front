import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from "./components/home/home.component";
import { PracticaComponent } from './components/usuarios/maestro/practica/practica.component';
import { VerPracticasComponent } from "./components/usuarios/maestro/ver-practicas/ver-practicas.component";
import { VerPracticaInidividualComponent } from "./components/usuarios/maestro/ver-practicas/ver-practica-inidividual/ver-practica-inidividual.component";
import { CrearExamenComponent } from "./components/usuarios/maestro/examenes/crear-examen/crear-examen.component";
import { VerExamenComponent } from "./components/usuarios/maestro/examenes/ver-examen/ver-examen.component";
import { CrearPreguntasComponent } from "./components/usuarios/maestro/examenes/crear-preguntas/crear-preguntas.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'crearPracticas', component: PracticaComponent },
  { path: 'verPracticas', component: VerPracticasComponent },
  { path:'verPracticaInidividual/:id', component: VerPracticaInidividualComponent },
  { path: 'crearExamen', component: CrearExamenComponent },
  { path:'verExamen', component: VerExamenComponent},
  { path: 'crearPreguntas', component: CrearPreguntasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
