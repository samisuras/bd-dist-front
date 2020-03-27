import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from "./components/home/home.component";
import { PracticaComponent } from './components/usuarios/maestro/practica/practica.component';
import { VerPracticasComponent } from "./components/usuarios/maestro/ver-practicas/ver-practicas.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'crearPracticas', component: PracticaComponent },
  { path: 'verPracticas', component: VerPracticasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
