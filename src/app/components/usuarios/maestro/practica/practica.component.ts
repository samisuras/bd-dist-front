import { Component, OnInit } from '@angular/core';
import { ProfesorService } from "../../../../services/profesor.service";
import { FormBuilder } from "@angular/forms";


@Component({
  selector: 'app-practica',
  templateUrl: './practica.component.html',
  styleUrls: ['./practica.component.css']
})
export class PracticaComponent implements OnInit {
  /*
   "materias": [
        {
            "nombre": "Instrumentacion Electronica"
        },
        {
            "nombre": "Electronica II"
        }
    ]
  */
 /*
  "grupos": [
        {
            "nombre": "ISC 8 C"
        }
    ]
 */
  materias:any;
  grupos:any;
  idmateria:string;
  practicaForm;

  constructor(private profesorService:ProfesorService,private formBuilder:FormBuilder) { 
    this.practicaForm = this.formBuilder.group({
      fecha: '',
      hora: '',
      materia: '',
      grupo: '',
      archivo: ''
    })
  }

  ngOnInit() {
    //let id = sessionStorage.getItem('id');
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
    this.idmateria = materia.idmateria
    this.profesorService.getGrupos(sessionStorage.getItem('id'),this.idmateria)
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
    console.log(formData)

  }
}
