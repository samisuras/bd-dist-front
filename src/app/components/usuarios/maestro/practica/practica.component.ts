import { Component, OnInit } from '@angular/core';
import { ProfesorService } from "../../../../services/profesor.service";

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
  materias:any;

  constructor(private profesorService:ProfesorService) { }

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

}
