import { Component, OnInit, ElementRef } from '@angular/core';
import { EstudianteService } from '../../../../services/estudiante.service'
import { ActivatedRoute } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-ver-practica',
  templateUrl: './ver-practica.component.html',
  styleUrls: ['./ver-practica.component.css']
})
export class VerPracticaComponent implements OnInit {
  practicaForm: FormGroup;
  practicas
  idMateria
  idProfesor
  idAlumno
  idgrupo
  constructor(
    private activatedRoute: ActivatedRoute,
    private estudiante_service: EstudianteService,
    private formBuilder: FormBuilder,
    private el: ElementRef
  ) {

  }
 
  ngOnInit() {
    this.idMateria = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.idMateria)
    this.estudiante_service.getPracticasAlumno(sessionStorage.getItem('id'), this.idMateria)
      .subscribe(
        (res: any) => {
          console.log(res)
          this.practicas = res.practicas
          this.idProfesor = res.practicas[0].idprofesor
          this.idAlumno = res.practicas[0].idalumno
          this.idgrupo = res.practicas[0].idgrupo
        }
        , (err) => {
          console.log(err)
        }
      )

  }

}
