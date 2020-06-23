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
import { VerExamenIndividualComponent } from "./components/usuarios/maestro/examenes/ver-examen-individual/ver-examen-individual.component";
import { MaterialesComponent } from "./components/usuarios/laboratorista/materiales/materiales.component";
import { MateriasComponent } from "./components/usuarios/estudiante/materias/materias.component"
import { VerExamenesComponent } from "./components/usuarios/estudiante/ver-examenes/ver-examenes.component"
import { VerPracticaComponent } from "./components/usuarios/estudiante/ver-practica/ver-practica.component"
import { RealizarExamenComponent } from "./components/usuarios/estudiante/realizar-examen/realizar-examen.component"


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'crearPracticas', component: PracticaComponent },
  { path: 'verPracticas', component: VerPracticasComponent },
  { path:'verPracticaInidividual/:id', component: VerPracticaInidividualComponent },
  { path: 'crearExamen', component: CrearExamenComponent },
  { path:'verExamen', component: VerExamenComponent},
  { path: 'crearPreguntas', component: CrearPreguntasComponent },
  { path: 'verExamenInidividual/:id', component: VerExamenIndividualComponent },
  { path: 'verMateriales', component:MaterialesComponent},
  { path: 'verMaterias', component: MateriasComponent},
  { path: 'verExamenesAlumno/:id', component: VerExamenesComponent},
  { path: 'verPracticasAlumno/:id', component: VerPracticaComponent},
  { path: 'realizarExamen/:id', component: RealizarExamenComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
