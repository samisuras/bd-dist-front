import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ProfesorService } from "../../../../../services/profesor.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-crear-examen',
  templateUrl: './crear-examen.component.html',
  styleUrls: ['./crear-examen.component.css']
})
export class CrearExamenComponent implements OnInit {

  idprofesor;
  materias:Array<any>;
  examenForm;
  grupos:any;
  idmateria

  constructor(private formBuilder:FormBuilder,private profesorService:ProfesorService,private router:Router) {
    this.examenForm = formBuilder.group({
      nombre: '',
      fecha: '',
      hora: '',
      materia: '',
      grupo: ''
    })
  }

  ngOnInit() {
    this.idprofesor = sessionStorage.getItem('id')
    this.profesorService.getMaterias(this.idprofesor).subscribe(
      (res:any) => {
        this.materias = res.materias
      }
    )
  }

  onSubmit(formData) {
    formData.idprofesor = this.idprofesor;
    formData.idmateria = this.idmateria;
    let grupo = this.grupos.find((grupo) =>  grupo.nombre == formData.grupo )
    formData.idgrupo = grupo.idgrupo;
    //sitio
    formData.sitio = sessionStorage.getItem('sitio')
    console.log(formData)
    this.profesorService.crearExamen(formData).subscribe(
      (res:any)=> {
        console.log(res.idexamen)
        this.router.navigate(['/crearPreguntas'],{ queryParams: {idexamen: res.idexamen,nombre: formData.nombre}})
      },
      (error) => console.log(error)
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
}
