import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProfesorService } from "../../../../../services/profesor.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-ver-examen-individual',
  templateUrl: './ver-examen-individual.component.html',
  styleUrls: ['./ver-examen-individual.component.css']
})
export class VerExamenIndividualComponent implements OnInit {

  idExamen
  examenes
  notasForm

  constructor(private activatedRoute:ActivatedRoute,private profesorService:ProfesorService,private formBuilder:FormBuilder) {
    this.notasForm = formBuilder.group({
      notas: ''
    })
  }

  ngOnInit() {
    this.idExamen = this.activatedRoute.snapshot.paramMap.get('id')
    this.getLista()
  }

  private getLista(){
    this.profesorService.getExamenesAlumnos(this.idExamen).subscribe(
      (res:any) => {
        this.examenes = res.examenes_alumnos
        console.log(this.examenes)
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  onSubmit(formData,idalumno){
    console.log(formData,idalumno)
    let json = {
      nota: formData.notas,
      idalumno: idalumno,
      idexamen: this.idExamen
    }
    this.profesorService.actualizarNotas(json).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }

  trackByMethod(index:number, el:any): number {
    return el.idalumno;
  }
}
