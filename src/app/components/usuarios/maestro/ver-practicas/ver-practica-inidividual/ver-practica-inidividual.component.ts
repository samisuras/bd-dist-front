import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProfesorService } from "../../../../../services/profesor.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-ver-practica-inidividual',
  templateUrl: './ver-practica-inidividual.component.html',
  styleUrls: ['./ver-practica-inidividual.component.css']
})
export class VerPracticaInidividualComponent implements OnInit {

  practicas
  idPractica
  calificarForm
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private profesorService:ProfesorService,
    private formBuilder:FormBuilder
    ) {
      this.calificarForm = formBuilder.group({
        calificacion: 0,
        notas: ''
      })
    }

  ngOnInit() {
    this.idPractica = this.activatedRoute.snapshot.paramMap.get('id')
    this.getLista()
  }

  trackByMethod(index:number, el:any): number {
    return el.idalumno;
  }

  onSubmit(formData,nombre){
    let json = formData.value;
    json.idprofesor = sessionStorage.getItem('id')
    let practica = this.practicas.find((practica) => practica.nombre_alumno = nombre)
    json.idalumno = practica.idalumno
    json.idpractica = practica.idpractica
    console.log(json)
    this.profesorService.calificarPractica(json).subscribe(
      (res) => {
        console.log(res)
        this.getLista()
        document.getElementById('closemodal').click()
      },
      (err) => {
        console.log(err)
      }
    )
  }

  private getLista(){
    this.profesorService.getPracticasAlumnos(this.idPractica).subscribe(
      (res:any) => {
        console.log(res)
        this.practicas = res.practicas_alumnos
      },
      (err) =>{
        console.log(err)
      }
    )
  }
}
