import { Component, OnInit } from '@angular/core';
import { ProfesorService } from "../../../../../services/profesor.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-ver-examen',
  templateUrl: './ver-examen.component.html',
  styleUrls: ['./ver-examen.component.css']
})
export class VerExamenComponent implements OnInit {

  materias:Array<any>;
  grupos:Array<any>;
  buscarExamenForm;
  examenes:Array<any>;

  constructor(private profesorService:ProfesorService, private formBuilder:FormBuilder) {
    this.buscarExamenForm = this.formBuilder.group({
      materia: '',
      grupo: ''
    })
  }

  ngOnInit() {
    this.profesorService.getMaterias(sessionStorage.getItem("id"))
    .subscribe(
      (res:any)=>{
        this.materias = res.materias
        console.log(this.materias)
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  public obtenerIdMateria(e): void {
    let nombre = e.target.value;
    let materia = this.materias.find((materia)=> nombre == materia.nombre);
    this.profesorService.getGrupos(sessionStorage.getItem('id'),materia.idmateria)
    .subscribe(
      (res:any)=>{
        this.grupos = res.grupos
        console.log(this.grupos)
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  onSubmit(formData){
    let idgrupo = this.buscaIdGrupo(formData.grupo)
    let idmateria = this.buscaIdMateria(formData.materia)
    const json = {
      idgrupo: idgrupo,
      idmateria: idmateria,
      idprofesor: sessionStorage.getItem('id')
    }
    console.log(json)
    this.profesorService.getExamenes(json).subscribe(
      (res:any)=> {
        console.log(res)
        this.examenes = res.examenes;
      },
      (err) => {
        console.log(err)
      }
    )
  }

  private buscaIdGrupo(nombreGrupo:string){
    const grupo = this.grupos.find((grupo) => grupo.nombre = nombreGrupo);
    return grupo.idgrupo
  }
  private buscaIdMateria(nombreMateria:string){
    const materia = this.materias.find((materia) => materia.nombre = nombreMateria);
    return materia.idmateria
  }

}
