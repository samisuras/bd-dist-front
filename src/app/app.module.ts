import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { EstudianteComponent } from './components/usuarios/estudiante/estudiante.component';
import { MaestroComponent } from './components/usuarios/maestro/maestro.component';
import { LaboratoristaComponent } from './components/usuarios/laboratorista/laboratorista.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    EstudianteComponent,
    MaestroComponent,
    LaboratoristaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
