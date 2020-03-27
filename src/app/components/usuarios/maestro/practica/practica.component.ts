import { Component, OnInit, ElementRef } from '@angular/core';
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
  fileToUpload: File = null;

  constructor(private profesorService:ProfesorService,private formBuilder:FormBuilder,private el:ElementRef) { 
    this.practicaForm = this.formBuilder.group({
      fecha: '',
      hora: '',
      materia: '',
      grupo: '',
      nombre: ''
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit(formData){
    let inputEl: HTMLInputElement =  this.el.nativeElement.querySelector('#archivo');
    let fileCount: number = inputEl.files.length;
    let jsonData = new FormData();
    if (fileCount > 0) { // a file was selected
        for (let i = 0; i < fileCount; i++) {
          jsonData.append('file', inputEl.files.item(i));
        }
        formData.idprofesor = sessionStorage.getItem("id")
        formData.nombreArchivo = inputEl.files.item(0).name
        let materia = this.materias.find((materia)=> formData.materia == materia.nombre);
        formData.idmateria = materia.idmateria
        let grupo = this.grupos.find((grupo)=> formData.grupo == grupo.nombre);
        formData.idgrupo = grupo.idgrupo
        let stringJSON:string = JSON.stringify(formData);
        jsonData.append('form',stringJSON)
        this.profesorService.crearPractica(jsonData).subscribe(
          (res) =>{
            console.log(res)
          },
          (err) => {
            console.log(err)
          }
        )
    }
  }
}