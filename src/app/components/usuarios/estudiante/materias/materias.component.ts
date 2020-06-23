import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../../services/estudiante.service'
@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  materias
  carrera
  grupo
  semestre
  idalumno
  constructor(private estudiante_service:EstudianteService) { }

  ngOnInit() {
    this.estudiante_service.getMateriasAlumno(sessionStorage.getItem('id'))
    .subscribe(
      (res:any)=>{
        console.log(res)
        this.materias = res.materias
        this.carrera = res.materias[0].carrera
        this.grupo = res.materias[0].grupo
        this.semestre = res.materias[0].semestre
        this.idalumno = sessionStorage.getItem('id')

      }
      ,(err)=>{
        console.log(err)
      }
    )
  }

}
