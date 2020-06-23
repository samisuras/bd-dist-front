import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from "@angular/forms";
import { JefeDepartamentoService } from "../../../../services/jefe-departamento.service";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  dia:boolean = true
  periodo:boolean = false
  periodoForm:FormGroup
  laboratorios:Array<any>

  constructor(private formBuilder:FormBuilder, private jefeService:JefeDepartamentoService) { 
    this.periodoForm = formBuilder.group({
      dia1: '',
      dia2: ''
    })
  }

  ngOnInit() {
  }

  diaFunction(){
    this.dia = true
    this.periodo = false
  }

  periodoFunction(){
    this.dia = false
    this.periodo = true
  }

  buscaDia(data){
    //Buscar
    this.jefeService.reporteDia(data)
    .subscribe(
      (res:any) =>{
        console.log(res);
        this.laboratorios = res.laboratorios
        if(this.laboratorios.length == 0)
          alert('No hay prestamos en esta fecha')
      },
      (err)=> {
        console.log(err);
      }
    )
  }

  submit(periodoData){
    if(periodoData.dia1 >= periodoData.dia2)
      alert('La fecha 1 debe ser mas grande que la fecha 2')
    //Buscar
    this.jefeService.reporteFecha(periodoData.dia1,periodoData.dia2)
    .subscribe(
      (res:any)=>{
        this.laboratorios = res.laboratorios
        if(this.laboratorios.length == 0)
          alert('No hay prestamos en esta fecha')
      },
      (err)=>{
        console.log(err);
        
      }
    )
  }

}
