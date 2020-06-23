import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../../services/estudiante.service'
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-ver-practica',
  templateUrl: './ver-practica.component.html',
  styleUrls: ['./ver-practica.component.css']
})
export class VerPracticaComponent implements OnInit {

  practicas
  idMateria
  constructor(
    private activatedRoute:ActivatedRoute,
    private estudiante_service:EstudianteService
    ) { }

  ngOnInit() {
    this.idMateria = this.activatedRoute.snapshot.paramMap.get('id')

    this.estudiante_service.getPracticasAlumno(sessionStorage.getItem('id'), this.idMateria)
    .subscribe(
      (res:any)=>{
        console.log(res)
        this.practicas = res.practicas
      }
      ,(err)=>{
        console.log(err)
      }
    )
  
  }

}
