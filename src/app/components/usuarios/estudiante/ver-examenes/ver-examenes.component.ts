import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../../services/estudiante.service'
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-ver-examenes',
  templateUrl: './ver-examenes.component.html',
  styleUrls: ['./ver-examenes.component.css']
})
export class VerExamenesComponent implements OnInit {

  examenes
  idMateria
  constructor(
    private activatedRoute:ActivatedRoute,
    private estudiante_service:EstudianteService
    ) { }

  ngOnInit() {

    this.idMateria = this.activatedRoute.snapshot.paramMap.get('id')

    this.estudiante_service.getExamenesAlumno(sessionStorage.getItem('id'), this.idMateria)
    .subscribe(
      (res:any)=>{
        console.log(res)
        this.examenes = res.examenes
      }
      ,(err)=>{
        console.log(err)
      }
    )
  }
  

}
