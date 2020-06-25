import { Component, OnInit } from '@angular/core';
import {LaboratoristaService} from '../../../../services/laboratorista.service'
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-crear-prestamo',
  templateUrl: './crear-prestamo.component.html',
  styleUrls: ['./crear-prestamo.component.css']
})
export class CrearPrestamoComponent implements OnInit {
  prestamoForm:any
  materiales:Array<any>
  prestados:Map<any,any>= new Map()
  alumnos:Array<any>
  idlaboratorista:any
  sitio:any
  cantMateriales:Map<any,any>=new Map()

  constructor(private formBuilder:FormBuilder, private router:Router, private service:LaboratoristaService) { 
    this.prestamoForm=formBuilder.group({
      alumno_idalumno:'',
    })
  }

  ngOnInit() {
    this.idlaboratorista=sessionStorage.getItem('id')
    this.sitio=sessionStorage.getItem("sitio")
    this.service.getMateriales().subscribe(
      (res:any)=>{
        this.materiales=res.materiales
        for (let index = 0; index < this.materiales.length; index++) {
          this.prestados.set(this.materiales[index].idproducto,0)
        }
        for (let index = 0; index < res.prestados.length; index++) {
          this.prestados.set(res.prestados[index].idproducto,res.prestados[index].prestados)
        }
      }
    )
    this.service.getEstudiantes().subscribe(
      (res:any)=>{
        this.alumnos=res.estudiantes
      }
    )
  }
  
  onSubmit(form){
    if(this.cantMateriales.size>0){
      let date = new Date();
      let month = '' + (date.getMonth() + 1),
          day = '' + (date.getDate());
      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;
      let fecha = [date.getFullYear(), month, day].join('-');
      let materiales:Array<{}>=Array()
      this.cantMateriales.forEach((value:any,key:any)=>{
        materiales.push(
          {"idproducto":key,"cantidad":value}
        )
      })
      form.laboratorista_idlaboratorista=this.idlaboratorista
      form.fecha=fecha
      form.materiales=materiales
      form.sitio=this.sitio
      this.service.crearPrestamo(form).subscribe(
        (res:any)=>{
          console.log(res)
          this.router.navigate(['/verPrestamos'])
        }
      )
    }
    
  }

  actualizarCantidad(cant:any,idproducto:any){
    cant=cant.target.value
    this.cantMateriales.set(idproducto,cant)
  }
}
