import { Component, OnInit } from '@angular/core';
import { LaboratoristaService } from "../../../../services/laboratorista.service";

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  pendientes:Array<any>=Array()
  terminados:Array<any>=Array()
  mostrarMateriales:Map<any,boolean>=new Map()
  materiales:Map<any,string>= new Map()
  fecha:any

  constructor(private laboratoristaService:LaboratoristaService) { }

  ngOnInit() {
    this.laboratoristaService.getPrestamos().subscribe(
      (res:any)=>{
        for (let index = 0; index < res.prestamos.length; index++) {
          if(res.prestamos[index].fecha_devuelto==" "){
            this.pendientes.push(res.prestamos[index])
          }else{
            this.terminados.push(res.prestamos[index])
          }
          this.mostrarMateriales.set(res.prestamos[index].idprestamo,false)
          this.materiales.set(res.prestamos[index].idprestamo,"")
        }
      },
      (err) =>{
        console.log(err)
      }
    )
    let date = new Date();
    let month = '' + (date.getMonth() + 1),
        day = '' + (date.getDate());
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    this.fecha = [date.getFullYear(), month, day].join('-');
    console.log(this.fecha)
  }

  getMensajeBoton(idprestamo:any){
    return this.mostrarMateriales.get(idprestamo)?"Dejar de mostrar":"Mostrar materiales"
  }

  cambiarMateriales(idprestamo:any){
    this.mostrarMateriales.set(idprestamo,!this.mostrarMateriales.get(idprestamo))
    this.verMateriales(idprestamo)
  }

  verMateriales(idprestamo:any) {
    
    this.laboratoristaService.getMaterialesPrestamo(idprestamo).subscribe(
      (res:any)=>{
        console.log(res)
        let mate=""
        for (let index = 0; index < res.materiales.length; index++) {
          mate+=res.materiales[index].nombre+": "+res.materiales[index].cantidad+"\n"
        }
        this.materiales.set(idprestamo,mate)
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  finalizarPrestamo(idprestamo:any){
    this.laboratoristaService.finalizarPrestamo(idprestamo,this.fecha).subscribe(
      (res:any)=>{
        const index=this.pendientes.findIndex(x=>x.idprestamo==idprestamo)
        const prestamo=this.pendientes[index]
        prestamo.fecha_devuelto=res.fecha
        this.terminados.unshift(prestamo)
        this.pendientes.splice(index,1)
      },
      (err) =>{
        console.log(err)
      }
    )
  }
}
