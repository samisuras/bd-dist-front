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
    /*if(this.mostrarMateriales.get(idprestamo)){
      const promise= this.laboratoristaService.getMaterialesPrestamo(idprestamo).toPromise();
      promise.then((data)=>{
        let mate=""
          for (let index = 0; index < data.materiales.length; index++) {
            mate+=data.materiales[index].nombre+": "+data.materiales[index].cantidad+"\n"
          }
          return mate
        console.log(JSON.stringify(data))
      })
    }*/
    
  }
}
